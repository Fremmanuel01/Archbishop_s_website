<?php
/**
 * Plugin Name:  Pastoral Diary Widget
 * Plugin URI:   https://archbishopvalokeke.org
 * Description:  Elementor widget for pastoral programmes with CSV upload and Google Calendar integration.
 * Version:      2.0.0
 * Author:       Archdiocese of Onitsha
 * License:      GPL-2.0-or-later
 * Text Domain:  pastoral-diary
 * Requires at least: 5.8
 * Requires PHP: 7.2
 */

defined( 'ABSPATH' ) || exit;

define( 'PD_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'PD_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'PD_VERSION',    '2.0.0' );

add_action( 'plugins_loaded', 'pastoral_diary_init' );

function pastoral_diary_init() {
    if ( ! did_action( 'elementor/loaded' ) ) {
        add_action( 'admin_notices', 'pastoral_diary_elementor_notice' );
        return;
    }
    add_action( 'elementor/widgets/register', 'pastoral_diary_register_widget' );
    add_action( 'wp_enqueue_scripts',         'pastoral_diary_enqueue_fonts' );
}

function pastoral_diary_elementor_notice() {
    echo '<div class="notice notice-warning is-dismissible"><p>'
        . '<strong>Pastoral Diary Widget</strong> requires Elementor to be installed and activated.'
        . '</p></div>';
}

function pastoral_diary_register_widget( $widgets_manager ) {
    require_once PD_PLUGIN_DIR . 'class-pastoral-diary-widget.php';
    $widgets_manager->register( new Pastoral_Diary_Widget() );
}

function pastoral_diary_enqueue_fonts() {
    // Only enqueue fonts on pages that actually use the widget
    if ( ! function_exists( 'elementor_get_current_post_id' ) ) return;
    $post_id = elementor_get_current_post_id();
    if ( ! $post_id || ! \Elementor\Plugin::$instance->db->is_built_with_elementor( $post_id ) ) return;

    wp_enqueue_style(
        'pastoral-diary-fonts',
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap',
        array(),
        null
    );
}

// ── AJAX: serve downloadable CSV template ────────────────────────────────────
add_action( 'wp_ajax_pd_download_template',        'pastoral_diary_serve_template' );
add_action( 'wp_ajax_nopriv_pd_download_template', 'pastoral_diary_serve_template' );

function pastoral_diary_serve_template() {
    $rows = array(
        'date,end_date,title,type,highlight,location,description',
        '2025-01-01,,New Year Mass at the Basilica,Mass,yes,Basilica of the Most Holy Trinity,Opening Mass for the New Year',
        '2025-02-14,,Annual Retreat for Clergy,Retreat,no,Onitsha Retreat Centre,Annual gathering for priests and religious',
        '2025-04-13,,Palm Sunday Mass,Mass,yes,Cathedral,Beginning of Holy Week',
        '2025-04-20,,Easter Sunday Pontifical Mass,Mass,yes,Basilica,',
        '2025-05-01,,Workers Day Pastoral Visit,Visit,no,Nnewi,',
        '2025-07-14,2025-07-16,Priests Retreat Group I,Retreat,no,Retreat Centre,Multi-day event: fill end_date for multi-day',
        '2025-08-15,,Assumption of Our Lady,Mass,yes,Cathedral,',
        '2025-10-18,,St Charles Borromeo Pastoral Visit,Visit,yes,Onitsha Nursing College,',
        '2025-12-25,,Christmas Day Pontifical Mass,Mass,yes,Onitsha Cathedral,',
    );

    header( 'Content-Type: text/csv; charset=utf-8' );
    header( 'Content-Disposition: attachment; filename="pastoral-diary-template.csv"' );
    header( 'Pragma: no-cache' );
    header( 'Expires: 0' );
    echo implode( "\n", $rows );
    wp_die();
}

// ── AJAX: save an event override (admin only) ─────────────────────────────────
add_action( 'wp_ajax_pd_save_override', 'pastoral_diary_save_override' );

function pastoral_diary_save_override() {
    check_ajax_referer( 'pd_edit_nonce', 'nonce' );

    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    $post_id   = intval( $_POST['post_id']   ?? 0 );
    $widget_id = sanitize_key( $_POST['widget_id'] ?? '' );
    $event_key = sanitize_key( $_POST['event_key'] ?? '' );

    if ( ! $post_id || ! $widget_id || ! $event_key ) {
        wp_send_json_error( array( 'message' => 'Missing parameters' ) );
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    // Allowed event types whitelist
    $allowed_types = array( 'Mass', 'Visit', 'Meeting', 'Retreat', 'Special', 'Ordination', 'Youth', 'Lent', 'Easter' );

    $raw_date     = sanitize_text_field( $_POST['date']        ?? '' );
    $raw_end_date = sanitize_text_field( $_POST['end_date']    ?? '' );
    $raw_type     = sanitize_text_field( $_POST['type']        ?? 'Special' );

    // Validate date format
    $date_obj = \DateTime::createFromFormat( 'Y-m-d', $raw_date );
    if ( ! $date_obj ) {
        wp_send_json_error( array( 'message' => 'Invalid date format' ) );
    }
    if ( ! empty( $raw_end_date ) ) {
        $end_obj = \DateTime::createFromFormat( 'Y-m-d', $raw_end_date );
        if ( ! $end_obj ) $raw_end_date = '';
    }

    // Whitelist type
    if ( ! in_array( $raw_type, $allowed_types, true ) ) {
        $raw_type = 'Special';
    }

    $override = array(
        'title'       => sanitize_text_field( $_POST['title']       ?? '' ),
        'date'        => $raw_date,
        'end_date'    => $raw_end_date,
        'type'        => $raw_type,
        'highlight'   => ( isset( $_POST['highlight'] ) && $_POST['highlight'] === '1' ),
        'location'    => sanitize_text_field( $_POST['location']    ?? '' ),
        'description' => sanitize_textarea_field( $_POST['description'] ?? '' ),
    );

    $meta_key  = '_pd_overrides_' . $widget_id;
    $overrides = get_post_meta( $post_id, $meta_key, true );
    if ( ! is_array( $overrides ) ) $overrides = array();
    $overrides[ $event_key ] = $override;
    update_post_meta( $post_id, $meta_key, $overrides );

    wp_send_json_success( $override );
}

// ── AJAX: delete an event override (revert to CSV) ────────────────────────────
add_action( 'wp_ajax_pd_delete_override', 'pastoral_diary_delete_override' );

function pastoral_diary_delete_override() {
    check_ajax_referer( 'pd_edit_nonce', 'nonce' );

    if ( ! current_user_can( 'edit_posts' ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    $post_id   = intval( $_POST['post_id']   ?? 0 );
    $widget_id = sanitize_key( $_POST['widget_id'] ?? '' );
    $event_key = sanitize_key( $_POST['event_key'] ?? '' );

    if ( ! $post_id || ! $widget_id || ! $event_key ) {
        wp_send_json_error( array( 'message' => 'Missing parameters' ) );
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        wp_send_json_error( array( 'message' => 'Unauthorized' ), 403 );
    }

    $meta_key  = '_pd_overrides_' . $widget_id;
    $overrides = get_post_meta( $post_id, $meta_key, true );
    if ( is_array( $overrides ) && isset( $overrides[ $event_key ] ) ) {
        unset( $overrides[ $event_key ] );
        if ( empty( $overrides ) ) {
            delete_post_meta( $post_id, $meta_key );
        } else {
            update_post_meta( $post_id, $meta_key, $overrides );
        }
    }

    wp_send_json_success();
}
