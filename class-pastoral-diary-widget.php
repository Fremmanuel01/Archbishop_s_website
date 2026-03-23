<?php
defined( 'ABSPATH' ) || exit;

class Pastoral_Diary_Widget extends \Elementor\Widget_Base {

    public function get_name()       { return 'pastoral_diary'; }
    public function get_title()      { return 'Pastoral Diary'; }
    public function get_icon()       { return 'eicon-calendar'; }
    public function get_categories() { return array( 'general' ); }
    public function get_keywords()   { return array( 'pastoral', 'diary', 'calendar', 'schedule', 'archbishop' ); }

    // =========================================================================
    // CONTROLS
    // =========================================================================
    protected function register_controls() {

        // ── Header Info ──────────────────────────────────────────────────────
        $this->start_controls_section( 'sec_header', array(
            'label' => '✦ Header Info',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ) );

        $this->add_control( 'prog_title', array(
            'label'       => 'Programme Title',
            'type'        => \Elementor\Controls_Manager::TEXT,
            'default'     => 'My Pastoral Programme for 2025',
            'label_block' => true,
        ) );
        $this->add_control( 'arch_name', array(
            'label'       => 'Archbishop / Bishop Name',
            'type'        => \Elementor\Controls_Manager::TEXT,
            'default'     => 'Most Rev. Valerian M. Okeke',
            'label_block' => true,
        ) );
        $this->add_control( 'diocese', array(
            'label'       => 'Diocese / Position Title',
            'type'        => \Elementor\Controls_Manager::TEXT,
            'default'     => 'Archbishop of Onitsha',
            'label_block' => true,
        ) );
        $this->add_control( 'prog_year', array(
            'label'   => 'Programme Year',
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 2025,
            'min'     => 2020,
            'max'     => 2099,
        ) );

        $this->end_controls_section();

        // ── Features ─────────────────────────────────────────────────────────
        $this->start_controls_section( 'sec_features', array(
            'label' => '✦ Features',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ) );

        $this->add_control( 'show_dark_toggle', array(
            'label'   => 'Show Dark Mode Toggle',
            'type'    => \Elementor\Controls_Manager::SWITCHER,
            'default' => 'yes',
        ) );
        $this->add_control( 'show_gcal', array(
            'label'   => 'Show Google Calendar Buttons',
            'type'    => \Elementor\Controls_Manager::SWITCHER,
            'default' => 'yes',
        ) );

        $this->end_controls_section();

        // ── Events CSV Upload ─────────────────────────────────────────────────
        $this->start_controls_section( 'sec_events', array(
            'label' => '✦ Events CSV',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ) );

        $template_url = admin_url( 'admin-ajax.php' ) . '?action=pd_download_template';

        $this->add_control( 'csv_upload_info', array(
            'type' => \Elementor\Controls_Manager::RAW_HTML,
            'raw'  =>
                '<div style="background:#f0f7ff;border-left:3px solid #4a6cf7;padding:10px 12px;border-radius:4px;font-size:12px;line-height:1.7;margin-bottom:6px;">'
                . '<strong>How to add events:</strong><br>'
                . '1. Download the CSV template below<br>'
                . '2. Fill in your events (one per row)<br>'
                . '3. Save as <code>.csv</code> and upload via Media Library<br>'
                . '4. Pick the file using the button below<br>'
                . '5. Click <strong>Update</strong> — done!<br><br>'
                . '<strong>Required columns:</strong> <code>date</code>, <code>title</code>, <code>type</code><br>'
                . '<strong>Optional:</strong> <code>end_date</code>, <code>highlight</code> (yes/no), <code>location</code>, <code>description</code><br><br>'
                . '<strong>Types:</strong> Mass · Visit · Meeting · Retreat · Special · Ordination · Youth · Lent · Easter'
                . '</div>'
                . '<a href="' . esc_url( $template_url ) . '" target="_blank" '
                . 'style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;background:#4a6cf7;color:#fff;border-radius:4px;font-size:12px;text-decoration:none;font-weight:500;margin-bottom:12px;">'
                . '&#8595; Download CSV Template</a>',
        ) );

        $this->add_control( 'events_csv_file', array(
            'label'       => 'Upload Events CSV',
            'type'        => \Elementor\Controls_Manager::MEDIA,
            'media_types' => array( 'text/csv', 'text/plain', 'application/csv', 'application/vnd.ms-excel' ),
            'description' => 'Upload your CSV file via the WordPress Media Library.',
        ) );

        $this->add_control( 'csv_status', array(
            'type' => \Elementor\Controls_Manager::RAW_HTML,
            'raw'  => '<div id="pd-csv-status" style="font-size:11px;color:#666;margin-top:4px;">No file selected — default events will be shown.</div>',
        ) );

        $this->end_controls_section();

        // ── Colors ────────────────────────────────────────────────────────────
        $this->start_controls_section( 'sec_colors', array(
            'label' => '✦ Colors',
            'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
        ) );

        $this->add_control( 'color_accent', array(
            'label'   => 'Accent / Gold',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#b8922f',
        ) );
        $this->add_control( 'color_hero_bg', array(
            'label'   => 'Hero Background',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#14213d',
        ) );
        $this->add_control( 'color_page_bg', array(
            'label'   => 'Page Background',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#faf7f2',
        ) );
        $this->add_control( 'color_surface', array(
            'label'   => 'Surface / Nav Background',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#f0ead9',
        ) );
        $this->add_control( 'color_text', array(
            'label'   => 'Body Text',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#1a1a1a',
        ) );
        $this->add_control( 'color_muted', array(
            'label'   => 'Muted / Date Text',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#888888',
        ) );
        $this->add_control( 'color_border', array(
            'label'   => 'Border / Divider',
            'type'    => \Elementor\Controls_Manager::COLOR,
            'default' => '#e0d4b8',
        ) );

        $this->end_controls_section();

        // ── Typography ────────────────────────────────────────────────────────
        $this->start_controls_section( 'sec_typography', array(
            'label' => '✦ Typography',
            'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
        ) );

        $this->add_control( '_typo_display_note', array(
            'type' => \Elementor\Controls_Manager::RAW_HTML,
            'raw'  => '<strong style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;">Display / Title Font</strong>',
        ) );
        $this->add_control( 'font_heading', array(
            'label'       => 'Heading Font Family',
            'type'        => \Elementor\Controls_Manager::FONT,
            'default'     => 'Cormorant Garamond',
            'label_block' => true,
        ) );
        $this->add_control( 'font_heading_size', array(
            'label'      => 'Hero Title Size (px)',
            'type'       => \Elementor\Controls_Manager::SLIDER,
            'size_units' => array( 'px' ),
            'range'      => array( 'px' => array( 'min' => 20, 'max' => 80, 'step' => 1 ) ),
            'default'    => array( 'unit' => 'px', 'size' => 48 ),
        ) );
        $this->add_control( 'font_heading_weight', array(
            'label'   => 'Heading Weight',
            'type'    => \Elementor\Controls_Manager::SELECT,
            'default' => '300',
            'options' => array(
                '100' => 'Thin (100)', '200' => 'Extra Light (200)',
                '300' => 'Light (300)', '400' => 'Regular (400)',
                '500' => 'Medium (500)', '600' => 'Semi Bold (600)',
                '700' => 'Bold (700)',
            ),
        ) );

        $this->add_control( '_typo_body_note', array(
            'type' => \Elementor\Controls_Manager::RAW_HTML,
            'raw'  => '<strong style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;display:block;margin-top:8px;">Body / UI Font</strong>',
        ) );
        $this->add_control( 'font_body', array(
            'label'       => 'Body Font Family',
            'type'        => \Elementor\Controls_Manager::FONT,
            'default'     => 'Jost',
            'label_block' => true,
        ) );
        $this->add_control( 'font_body_size', array(
            'label'      => 'Event Title Size (px)',
            'type'       => \Elementor\Controls_Manager::SLIDER,
            'size_units' => array( 'px' ),
            'range'      => array( 'px' => array( 'min' => 11, 'max' => 22, 'step' => 1 ) ),
            'default'    => array( 'unit' => 'px', 'size' => 14 ),
        ) );
        $this->add_control( 'font_kicker_spacing', array(
            'label'      => 'Kicker Letter Spacing (em)',
            'type'       => \Elementor\Controls_Manager::SLIDER,
            'size_units' => array( 'em' ),
            'range'      => array( 'em' => array( 'min' => 0.0, 'max' => 0.5, 'step' => 0.01 ) ),
            'default'    => array( 'unit' => 'em', 'size' => 0.22 ),
        ) );

        $this->end_controls_section();
    }

    // =========================================================================
    // CSV PARSING
    // =========================================================================
    private function parse_csv_from_attachment( $attachment_id ) {
        if ( empty( $attachment_id ) ) return array();

        $file_path = get_attached_file( intval( $attachment_id ) );
        if ( ! $file_path || ! file_exists( $file_path ) ) return array();

        // Guard against huge files (2 MB limit)
        if ( filesize( $file_path ) > 2 * 1024 * 1024 ) return array();

        $content = file_get_contents( $file_path );
        if ( empty( $content ) ) return array();

        return $this->parse_csv_string( $content );
    }

    private function parse_csv_string( $csv_text ) {
        $events = array();
        $lines  = preg_split( '/\r?\n/', trim( $csv_text ) );
        if ( count( $lines ) < 2 ) return $events;

        $raw_headers = str_getcsv( array_shift( $lines ) );
        $headers     = array_map( function( $h ) {
            return strtolower( trim( str_replace( array( '"', "'" ), '', $h ) ) );
        }, $raw_headers );

        foreach ( $lines as $line ) {
            $line = trim( $line );
            if ( empty( $line ) || $line[0] === '#' ) continue;

            $vals = str_getcsv( $line );
            $row  = array();
            foreach ( $headers as $idx => $key ) {
                $row[ $key ] = isset( $vals[ $idx ] ) ? trim( $vals[ $idx ] ) : '';
            }

            if ( empty( $row['date'] ) || empty( $row['title'] ) ) continue;

            // Validate date
            $date_obj = \DateTime::createFromFormat( 'Y-m-d', $row['date'] );
            if ( ! $date_obj ) continue;

            $event = array(
                'date'        => sanitize_text_field( $row['date'] ),
                'end_date'    => sanitize_text_field( $row['end_date'] ?? $row['end date'] ?? '' ),
                'title'       => sanitize_text_field( $row['title'] ),
                'type'        => sanitize_text_field( $row['type'] ?? 'Special' ),
                'highlight'   => strtolower( $row['highlight'] ?? '' ) === 'yes',
                'location'    => sanitize_text_field( $row['location'] ?? '' ),
                'description' => sanitize_text_field( $row['description'] ?? '' ),
            );
            // Stable unique key for this event (used by override system)
            $event['event_key'] = substr( md5( $event['date'] . '|' . $event['title'] ), 0, 12 );

            $events[] = $event;
        }

        return $events;
    }

    private function get_fallback_events( $year = 2025 ) {
        $y   = intval( $year );
        $csv = "date,end_date,title,type,highlight,location,description
{$y}-01-01,,New Year: Basilica of the Most Holy Trinity,Mass,yes,Basilica of the Most Holy Trinity,
{$y}-01-14,,CBP Bishops Meeting,Meeting,no,,
{$y}-02-02,,Day Withdrawal for the Religious — Thanksgiving,Retreat,yes,Ransoms,
{$y}-02-28,,Archdiocesan University — First Matriculation,Special,yes,Onitsha,
{$y}-03-01,,Inter-Missionaries Onitsha — Pastoral Visit,Visit,yes,Onitsha,
{$y}-04-13,,Palm Sunday — Basilica,Special,yes,Basilica,Beginning of Holy Week
{$y}-04-17,,Holy Thursday — Chrism Mass,Special,yes,Basilica,Holy Week
{$y}-04-18,,Good Friday Liturgy,Special,yes,Basilica,Holy Week
{$y}-04-19,,Holy Saturday — Easter Vigil,Special,yes,Basilica,Holy Week
{$y}-04-20,,Easter Sunday — Pontifical Mass,Special,yes,Basilica,
{$y}-06-29,,Pontifical Anniversary,Special,yes,,
{$y}-07-12,,Priestly Ordination,Ordination,yes,,
{$y}-08-15,,Assumption of Our Blessed Lady — Mass,Mass,yes,Cathedral,Solemnity of the Assumption
{$y}-11-01,,All Saints' Mass,Mass,yes,,Solemnity of All Saints
{$y}-12-25,,Christmas Day — Pontifical Mass,Mass,yes,Onitsha Cathedral,";
        return $this->parse_csv_string( $csv );
    }

    // =========================================================================
    // OVERRIDE SYSTEM
    // =========================================================================

    /**
     * Load saved admin overrides for this widget instance from post meta.
     */
    private function load_event_overrides( $post_id, $widget_id ) {
        if ( ! $post_id ) return array();
        $overrides = get_post_meta( $post_id, '_pd_overrides_' . $widget_id, true );
        return is_array( $overrides ) ? $overrides : array();
    }

    /**
     * Merge overrides into the events array. Overridden events also get
     * '_is_override' => true so the renderer can show the "edited" badge.
     */
    private function apply_event_overrides( $events, $overrides ) {
        if ( empty( $overrides ) ) return $events;
        foreach ( $events as &$ev ) {
            $key = $ev['event_key'] ?? '';
            if ( $key && isset( $overrides[ $key ] ) ) {
                $ev = array_merge( $ev, $overrides[ $key ] );
                $ev['event_key']   = $key; // keep original key
                $ev['_is_override'] = true;
            }
        }
        unset( $ev );
        return $events;
    }

    // =========================================================================
    // EVENT GROUPING (shared by nav + timeline)
    // =========================================================================

    /**
     * Group events into sorted associative array keyed by "Y-n" (year-month).
     */
    private function group_events( $events ) {
        $groups = array();
        foreach ( $events as $ev ) {
            $d = \DateTime::createFromFormat( 'Y-m-d', $ev['date'] );
            if ( ! $d ) continue;
            $key = $d->format('Y') . '-' . $d->format('n');
            $groups[ $key ][] = $ev;
        }
        uksort( $groups, function( $a, $b ) {
            list( $ay, $am ) = explode( '-', $a );
            list( $by, $bm ) = explode( '-', $b );
            return ( $ay !== $by ) ? intval( $ay ) - intval( $by ) : intval( $am ) - intval( $bm );
        } );
        return $groups;
    }

    // =========================================================================
    // RENDER HELPERS
    // =========================================================================
    private function get_month_name( $idx ) {
        static $m = array( 'January','February','March','April','May','June','July','August','September','October','November','December' );
        return $m[ $idx ] ?? '';
    }

    private function fmt_date( $event ) {
        $d = \DateTime::createFromFormat( 'Y-m-d', $event['date'] );
        if ( ! $d ) return esc_html( $event['date'] );
        $s = substr( $this->get_month_name( (int)$d->format('n') - 1 ), 0, 3 ) . ' ' . $d->format('j');
        if ( ! empty( $event['end_date'] ) && $event['end_date'] !== $event['date'] ) {
            $e = \DateTime::createFromFormat( 'Y-m-d', $event['end_date'] );
            if ( $e ) {
                if ( $e->format('n') === $d->format('n') ) {
                    $s .= '–' . $e->format('j');
                } else {
                    $s .= ' – ' . substr( $this->get_month_name( (int)$e->format('n') - 1 ), 0, 3 ) . ' ' . $e->format('j');
                }
            }
        }
        return $s;
    }

    private function gcal_url( $event ) {
        $start = str_replace( '-', '', $event['date'] );
        if ( ! empty( $event['end_date'] ) && $event['end_date'] !== $event['date'] ) {
            $e = \DateTime::createFromFormat( 'Y-m-d', $event['end_date'] );
            if ( $e ) {
                $e->modify( '+1 day' );
                $end = $e->format( 'Ymd' );
            } else {
                $d = \DateTime::createFromFormat( 'Y-m-d', $event['date'] );
                $d->modify( '+1 day' );
                $end = $d->format( 'Ymd' );
            }
        } else {
            $d = \DateTime::createFromFormat( 'Y-m-d', $event['date'] );
            $d->modify( '+1 day' );
            $end = $d->format( 'Ymd' );
        }
        return 'https://calendar.google.com/calendar/render?action=TEMPLATE'
            . '&text='     . rawurlencode( $event['title'] )
            . '&dates='    . $start . '/' . $end
            . '&location=' . rawurlencode( $event['location'] )
            . '&details='  . rawurlencode( $event['description'] );
    }

    private function render_month_nav( $groups, $uid ) {
        // Detect if events span multiple years (to suffix year on labels)
        $years      = array_unique( array_map( function( $k ) { return explode( '-', $k )[0]; }, array_keys( $groups ) ) );
        $multi_year = count( $years ) > 1;

        foreach ( $groups as $key => $month_events ) {
            list( $yr, $mn ) = explode( '-', $key );
            $m    = intval( $mn ) - 1;
            $lbl  = $this->get_month_name( $m ) . ( $multi_year ? ' ' . $yr : '' );
            $cnt  = count( $month_events );
            echo '<a href="#' . esc_attr( $uid . '_' . $key ) . '" data-month="' . esc_attr( $uid . '_' . $key ) . '">'
                . esc_html( $lbl )
                . '<span class="pd-nav-badge">(' . intval( $cnt ) . ')</span>'
                . '</a>';
        }
    }

    private function render_timeline( $groups, $uid, $show_gcal, $is_admin, $post_id, $widget_id, $overrides, $next_event_key = '' ) {
        if ( empty( $groups ) ) {
            echo '<div class="pd-empty">No events found. Upload a CSV file in the Elementor panel.</div>';
            return;
        }

        $type_labels = array(
            'mass'         => 'Mass',
            'visit'        => 'Pastoral Visit',
            'pastoralvisit'=> 'Pastoral Visit',
            'meeting'      => 'Meeting',
            'retreat'      => 'Retreat',
            'special'      => 'Special',
            'ordination'   => 'Ordination',
            'youth'        => 'Youth',
            'lent'         => 'Lent',
            'easter'       => 'Easter',
        );

        $type_options = array( 'Mass', 'Visit', 'Meeting', 'Retreat', 'Special', 'Ordination', 'Youth', 'Lent', 'Easter' );

        $current_year = null;

        foreach ( $groups as $key => $month_events ) {
            list( $yr, $mn ) = explode( '-', $key );
            $m   = intval( $mn ) - 1;
            $num = str_pad( $mn, 2, '0', STR_PAD_LEFT );

            if ( $yr !== $current_year ) {
                $current_year = $yr;
                echo '<div class="pd-year-sep"><span>' . esc_html( $yr ) . '</span></div>';
            }

            echo '<section class="pd-month" id="' . esc_attr( $uid . '_' . $key ) . '">';
            echo '<div class="pd-month-label">';
            echo '<span class="pd-month-num">' . esc_html( $num ) . '</span>';
            echo '<span class="pd-month-name">' . esc_html( $this->get_month_name( $m ) ) . '</span>';
            echo '</div>';
            echo '<div class="pd-month-events">';

            foreach ( $month_events as $ev ) {
                $event_key   = $ev['event_key'] ?? substr( md5( $ev['date'] . '|' . $ev['title'] ), 0, 12 );
                $is_override = ! empty( $ev['_is_override'] );
                $type_key    = strtolower( preg_replace( '/\s+/', '', $ev['type'] ) );
                $type_label  = isset( $type_labels[ $type_key ] ) ? esc_html( $type_labels[ $type_key ] ) : esc_html( $ev['type'] );
                $hl_class    = $ev['highlight'] ? ' pd-event--hl' : '';
                $ed_class    = $is_override    ? ' pd-event--edited' : '';
                $next_class  = ( $event_key === $next_event_key ) ? ' pd-event--next' : '';

                // PHP-rendered "Next Event" divider — always visible, no JS dependency
                if ( $event_key === $next_event_key ) {
                    echo '<div class="pd-next-divider" aria-hidden="true">';
                    echo '<svg class="pd-next-divider-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    echo '<span class="pd-next-divider-label">Next Event</span>';
                    echo '<svg class="pd-next-divider-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';
                    echo '</div>';
                }

                echo '<div class="pd-event' . $hl_class . $ed_class . $next_class . '" data-key="' . esc_attr( $event_key ) . '" data-date="' . esc_attr( $ev['date'] ) . '">';
                echo '<div class="pd-event-date">' . esc_html( $this->fmt_date( $ev ) ) . '</div>';
                echo '<div class="pd-event-body">';
                echo '<div class="pd-event-title">' . esc_html( $ev['title'] ) . '</div>';

                if ( ! empty( $ev['location'] ) ) {
                    echo '<div class="pd-event-location">&#128205; ' . esc_html( $ev['location'] ) . '</div>';
                }

                if ( ! empty( $ev['description'] ) ) {
                    echo '<div class="pd-event-desc">' . esc_html( $ev['description'] ) . '</div>';
                }

                echo '<div class="pd-event-meta">';
                echo '<span class="pd-tag pd-tag-' . esc_attr( $type_key ) . '">' . $type_label . '</span>';

                if ( $show_gcal ) {
                    $gcal = esc_url( $this->gcal_url( $ev ) );
                    echo '<a class="pd-gcal" href="' . $gcal . '" target="_blank" rel="noopener noreferrer" title="Add to Google Calendar">';
                    echo '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>';
                    echo ' Add to Calendar</a>';
                }

                if ( $is_override ) {
                    echo '<span class="pd-edited-badge">edited</span>';
                }

                if ( $is_admin ) {
                    // Encode safe event data for the JS edit form
                    $ev_safe = array(
                        'event_key'   => $event_key,
                        'title'       => $ev['title'],
                        'date'        => $ev['date'],
                        'end_date'    => $ev['end_date'],
                        'type'        => $ev['type'],
                        'highlight'   => (bool) $ev['highlight'],
                        'location'    => $ev['location'],
                        'description' => $ev['description'],
                    );
                    $ev_json = esc_attr( wp_json_encode( $ev_safe ) );
                    echo '<button class="pd-edit-btn" data-event=\'' . $ev_json . '\' aria-label="Edit event">&#9998; Edit</button>';
                    if ( $is_override ) {
                        echo '<button class="pd-revert-btn" data-key="' . esc_attr( $event_key ) . '" title="Revert to CSV original">&#8635; Revert</button>';
                    }
                }

                echo '</div>'; // .pd-event-meta
                echo '</div>'; // .pd-event-body
                echo '</div>'; // .pd-event

                // Hidden inline edit form (admin only)
                if ( $is_admin ) {
                    $this->render_edit_form( $ev, $event_key, $type_options );
                }
            }

            echo '</div>'; // .pd-month-events
            echo '</section>';
        }
    }

    /**
     * Render the hidden inline edit form for a single event.
     */
    private function render_edit_form( $ev, $event_key, $type_options ) {
        echo '<div class="pd-edit-form" data-key="' . esc_attr( $event_key ) . '" style="display:none" role="form" aria-label="Edit event">';
        echo '<div class="pd-edit-form-title">&#9998; Editing Event</div>';
        echo '<div class="pd-edit-grid">';

        // Title (full width)
        echo '<div class="pd-edit-field pd-edit-full">';
        echo '<label class="pd-edit-label">Title</label>';
        echo '<input type="text" name="title" class="pd-edit-input" value="' . esc_attr( $ev['title'] ) . '">';
        echo '</div>';

        // Date / End Date
        echo '<div class="pd-edit-field">';
        echo '<label class="pd-edit-label">Date</label>';
        echo '<input type="date" name="date" class="pd-edit-input" value="' . esc_attr( $ev['date'] ) . '">';
        echo '</div>';

        echo '<div class="pd-edit-field">';
        echo '<label class="pd-edit-label">End Date <span style="opacity:.6">(optional)</span></label>';
        echo '<input type="date" name="end_date" class="pd-edit-input" value="' . esc_attr( $ev['end_date'] ) . '">';
        echo '</div>';

        // Type / Location
        echo '<div class="pd-edit-field">';
        echo '<label class="pd-edit-label">Type</label>';
        echo '<select name="type" class="pd-edit-select">';
        foreach ( $type_options as $t ) {
            $sel = ( strtolower( $ev['type'] ) === strtolower( $t ) ) ? ' selected' : '';
            echo '<option value="' . esc_attr( $t ) . '"' . $sel . '>' . esc_html( $t ) . '</option>';
        }
        echo '</select>';
        echo '</div>';

        echo '<div class="pd-edit-field">';
        echo '<label class="pd-edit-label">Location</label>';
        echo '<input type="text" name="location" class="pd-edit-input" value="' . esc_attr( $ev['location'] ) . '">';
        echo '</div>';

        // Description (full width)
        echo '<div class="pd-edit-field pd-edit-full">';
        echo '<label class="pd-edit-label">Description</label>';
        echo '<textarea name="description" class="pd-edit-textarea">' . esc_textarea( $ev['description'] ) . '</textarea>';
        echo '</div>';

        // Highlight checkbox (full width)
        $checked = ! empty( $ev['highlight'] ) ? ' checked' : '';
        $hl_id   = 'hl_' . esc_attr( $event_key );
        echo '<div class="pd-edit-field pd-edit-full">';
        echo '<div class="pd-edit-checkbox-row">';
        echo '<input type="checkbox" name="highlight" id="' . $hl_id . '"' . $checked . '>';
        echo '<label for="' . $hl_id . '" class="pd-edit-label" style="text-transform:none;letter-spacing:0;">Highlight this event (gold indicator)</label>';
        echo '</div>';
        echo '</div>';

        echo '</div>'; // .pd-edit-grid

        echo '<div class="pd-edit-actions">';
        echo '<button type="button" class="pd-edit-save">Save Changes</button>';
        echo '<button type="button" class="pd-edit-cancel">Cancel</button>';
        echo '<span class="pd-edit-status"></span>';
        echo '</div>';

        echo '</div>'; // .pd-edit-form
    }

    // =========================================================================
    // MAIN RENDER
    // =========================================================================
    protected function render() {
        $s = $this->get_settings_for_display();

        $uid       = 'pd_' . $this->get_id();
        $widget_id = $this->get_id();
        $post_id   = get_the_ID();

        $show_dark = ( ( $s['show_dark_toggle'] ?? 'yes' ) === 'yes' );
        $show_gcal = ( ( $s['show_gcal']        ?? 'yes' ) === 'yes' );
        $is_admin  = is_user_logged_in() && current_user_can( 'edit_post', $post_id );

        $title = esc_html( $s['prog_title'] ?? 'My Pastoral Programme' );
        $arch  = esc_html( $s['arch_name']  ?? 'Most Rev. Valerian M. Okeke' );
        $dioc  = esc_html( $s['diocese']    ?? 'Archbishop of Onitsha' );
        $year  = intval( $s['prog_year'] ?? 2025 );

        // Use sanitize_hex_color for color values (correct for CSS context)
        $c_accent  = sanitize_hex_color( $s['color_accent']   ?? '' ) ?: '#b8922f';
        $c_hero_bg = sanitize_hex_color( $s['color_hero_bg']  ?? '' ) ?: '#14213d';
        $c_page_bg = sanitize_hex_color( $s['color_page_bg']  ?? '' ) ?: '#faf7f2';
        $c_surface = sanitize_hex_color( $s['color_surface']  ?? '' ) ?: '#f0ead9';
        $c_text    = sanitize_hex_color( $s['color_text']     ?? '' ) ?: '#1a1a1a';
        $c_muted   = sanitize_hex_color( $s['color_muted']    ?? '' ) ?: '#888888';
        $c_border  = sanitize_hex_color( $s['color_border']   ?? '' ) ?: '#e0d4b8';

        $f_heading        = esc_attr( $s['font_heading']                    ?? 'Cormorant Garamond' );
        $f_heading_size   = intval( $s['font_heading_size']['size']         ?? 48 );
        $f_heading_weight = esc_attr( $s['font_heading_weight']             ?? '300' );
        $f_body           = esc_attr( $s['font_body']                       ?? 'Jost' );
        $f_body_size      = intval( $s['font_body_size']['size']            ?? 14 );
        $f_kicker_spc     = number_format( floatval( $s['font_kicker_spacing']['size'] ?? 0.22 ), 3 );

        // Load events from uploaded CSV or fall back to defaults
        $events = array();
        $attachment_id = $s['events_csv_file']['id'] ?? '';
        if ( ! empty( $attachment_id ) ) {
            $events = $this->parse_csv_from_attachment( $attachment_id );
        }
        if ( empty( $events ) ) {
            $events = $this->get_fallback_events( $year );
        }

        // Apply any admin overrides saved for this widget
        $overrides = $this->load_event_overrides( $post_id, $widget_id );
        $events    = $this->apply_event_overrides( $events, $overrides );

        // Group events once — shared between nav and timeline
        $groups = $this->group_events( $events );

        // Compute next event key in PHP (reliable regardless of event dates)
        $today = date( 'Y-m-d' );
        $next_event_key = '';
        $sorted_ne = $events;
        usort( $sorted_ne, function( $a, $b ) { return strcmp( $a['date'], $b['date'] ); } );
        foreach ( $sorted_ne as $ev ) {
            if ( $ev['date'] >= $today ) {
                $next_event_key = $ev['event_key'] ?? substr( md5( $ev['date'] . '|' . $ev['title'] ), 0, 12 );
                break;
            }
        }
        // Fallback: if all events are past, mark the most recent one
        if ( empty( $next_event_key ) && ! empty( $sorted_ne ) ) {
            $last = end( $sorted_ne );
            $next_event_key = $last['event_key'] ?? substr( md5( $last['date'] . '|' . $last['title'] ), 0, 12 );
        }

        // Shared CSS — once per page load
        static $css_printed = false;
        if ( ! $css_printed ) {
            $this->print_shared_css();
            $css_printed = true;
        }

        // Per-widget CSS custom properties
        echo '<style>';
        echo '#' . esc_attr( $uid ) . '{';
        echo '--pd-accent:'     . $c_accent   . ';';
        echo '--pd-accent-lt:'  . $c_accent   . 'cc;';
        echo '--pd-hero-bg:'    . $c_hero_bg  . ';';
        echo '--pd-page-bg:'    . $c_page_bg  . ';';
        echo '--pd-surface:'    . $c_surface  . ';';
        echo '--pd-text:'       . $c_text     . ';';
        echo '--pd-muted:'      . $c_muted    . ';';
        echo '--pd-border:'     . $c_border   . ';';
        echo '--pd-font-head:"' . $f_heading  . '",serif;';
        echo '--pd-font-body:"' . $f_body     . '",sans-serif;';
        echo '--pd-title-size:' . $f_heading_size   . 'px;';
        echo '--pd-title-wt:'   . $f_heading_weight . ';';
        echo '--pd-body-size:'  . $f_body_size      . 'px;';
        echo '--pd-kicker-spc:' . $f_kicker_spc     . 'em;';
        echo '}';
        echo '</style>';

        // ── Widget HTML ──────────────────────────────────────────────────────
        $nonce_attr = $is_admin
            ? ' data-nonce="' . esc_attr( wp_create_nonce( 'pd_edit_nonce' ) ) . '"'
              . ' data-post="' . esc_attr( $post_id ) . '"'
              . ' data-widget="' . esc_attr( $widget_id ) . '"'
            : '';

        echo '<div id="' . esc_attr( $uid ) . '" class="pd-widget"' . $nonce_attr . '>';

        // Hero
        echo '<header class="pd-hero">';
        if ( $show_dark ) {
            echo '<button class="pd-theme-btn" onclick="pdToggleTheme(\'' . esc_js( $uid ) . '\')" aria-label="Toggle dark mode">';
            echo '<div class="pd-toggle-track"><div class="pd-toggle-thumb"></div></div>';
            echo '<span class="pd-sun-icon">&#9728;</span>';
            echo '<span class="pd-moon-icon">&#9790;</span>';
            echo '<span class="pd-toggle-lbl" id="' . esc_attr( $uid ) . '_lbl">Dark</span>';
            echo '</button>';
        }
        echo '<p class="pd-kicker">' . $arch . ' &bull; ' . $dioc . '</p>';
        echo '<h2 class="pd-title">' . $title . '</h2>';
        echo '<div class="pd-divider"><span></span></div>';
        echo '<p class="pd-subtitle">Anno Domini ' . $year . '</p>';
        echo '</header>';

        // Navigation bar: month tabs + date-jump toolbar
        echo '<div class="pd-nav-wrap">';
        echo '<nav class="pd-month-nav" aria-label="Jump to month">';
        $this->render_month_nav( $groups, $uid );
        echo '</nav>';
        echo '<div class="pd-nav-jump">';
        echo '<input type="date" class="pd-date-input" id="' . esc_attr( $uid ) . '_picker"'
            . ' title="Jump to date" aria-label="Jump to date">';
        echo '<button class="pd-today-btn" onclick="pdGoToToday(\'' . esc_js( $uid ) . '\')">Today</button>';
        echo '</div>';
        echo '</div>'; // .pd-nav-wrap

        // Timeline
        echo '<main class="pd-timeline">';
        $this->render_timeline( $groups, $uid, $show_gcal, $is_admin, $post_id, $widget_id, $overrides, $next_event_key );
        echo '</main>';

        echo '</div>'; // .pd-widget

        $this->print_scripts( $uid, $is_admin );
    }

    // =========================================================================
    // SCRIPTS
    // =========================================================================
    private function print_scripts( $uid, $is_admin ) {
        // Shared functions — printed once per page regardless of widget count
        static $shared_js_printed = false;
        $print_shared = ! $shared_js_printed;
        if ( ! $shared_js_printed ) {
            $shared_js_printed = true;
        }

        ob_start();
        ?>
<script>
<?php if ( $print_shared ) : ?>
var pdAjax = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
// Per-widget scroll-lock: prevents IntersectionObserver fighting programmatic scrolls
var pdScrolling = {};

// ── Dark mode ────────────────────────────────────────────────────────────────
function pdToggleTheme(uid) {
  var w = document.getElementById(uid);
  var l = document.getElementById(uid + '_lbl');
  if (!w) return;
  var dark = w.classList.toggle('pd-dark');
  if (l) l.textContent = dark ? 'Light' : 'Dark';
  try { localStorage.setItem(uid + '_theme', dark ? 'dark' : 'light'); } catch(e) {}
}

// ── Date navigation ──────────────────────────────────────────────────────────
function pdJumpToDate(uid, dateVal) {
  if (!dateVal) return;
  var parts = dateVal.split('-');
  if (parts.length < 2) return;
  var year  = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var target = document.getElementById(uid + '_' + year + '-' + month);
  if (!target) {
    // Find nearest available month
    var sections = document.querySelectorAll('#' + uid + ' .pd-month');
    var closest = null, closestDiff = Infinity;
    var targetMs = new Date(year, month - 1, 1).getTime();
    sections.forEach(function(s) {
      var id = s.id.replace(uid + '_', '').split('-');
      var sMs = new Date(parseInt(id[0], 10), parseInt(id[1], 10) - 1, 1).getTime();
      var diff = Math.abs(sMs - targetMs);
      if (diff < closestDiff) { closestDiff = diff; closest = s; }
    });
    target = closest;
  }
  if (target) {
    pdScrolling[uid] = true;
    pdScrollToSection(target);
    setTimeout(function() { pdScrolling[uid] = false; }, 900);
  }
}

function pdGoToToday(uid) {
  var t      = new Date();
  var year   = t.getFullYear();
  var month  = t.getMonth() + 1; // 1-based

  // Try exact current month first
  var target = document.getElementById(uid + '_' + year + '-' + month);

  if (!target) {
    // Walk all sections: prefer the closest FUTURE month; fall back to closest past
    var sections  = document.querySelectorAll('#' + uid + ' .pd-month');
    var todayMs   = new Date(year, month - 1, 1).getTime();
    var future = null, futureDiff = Infinity;
    var past   = null, pastDiff   = Infinity;

    sections.forEach(function(s) {
      var parts = s.id.replace(uid + '_', '').split('-');
      var sMs   = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1).getTime();
      var diff  = sMs - todayMs;
      if (diff >= 0 && diff < futureDiff) { futureDiff = diff; future = s; }
      if (diff <  0 && -diff < pastDiff)  { pastDiff  = -diff; past   = s; }
    });

    target = future || past; // always prefer future
  }

  if (target) {
    pdScrolling[uid] = true;
    pdScrollToSection(target);
    setTimeout(function() { pdScrolling[uid] = false; }, 900);
  }
}

// Scroll to a section accounting for any sticky header offset
function pdScrollToSection(el) {
  var top = el.getBoundingClientRect().top + window.pageYOffset;
  // Detect sticky headers: any fixed/sticky element above the widget
  var offset = 0;
  document.querySelectorAll('header, .site-header, #masthead, .elementor-sticky, [data-elementor-sticky]').forEach(function(h) {
    var style = window.getComputedStyle(h);
    if ((style.position === 'fixed' || style.position === 'sticky') && h.offsetHeight) {
      offset = Math.max(offset, h.offsetHeight);
    }
  });
  window.scrollTo({ top: top - offset - 8, behavior: 'smooth' });
}

// ── IntersectionObserver: active month in nav ────────────────────────────────
function pdInitObserver(uid) {
  if (!window.IntersectionObserver) return;
  var sections = document.querySelectorAll('#' + uid + ' .pd-month');
  var nav      = document.querySelector('#' + uid + ' .pd-month-nav');
  if (!sections.length || !nav) return;
  var observer = new IntersectionObserver(function(entries) {
    // Skip while a programmatic scroll is in progress to prevent bounce
    if (pdScrolling[uid]) return;
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      nav.querySelectorAll('a').forEach(function(a) {
        var active = a.dataset.month === id;
        a.classList.toggle('pd-nav-active', active);
        if (active) {
          // Only scroll the nav bar horizontally — never touch page scroll
          var navCenter = nav.offsetWidth / 2;
          var linkCenter = a.offsetLeft + a.offsetWidth / 2;
          nav.scrollTo({ left: linkCenter - navCenter, behavior: 'smooth' });
        }
      });
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60% 0px' });
  sections.forEach(function(s) { observer.observe(s); });
}

// ── Month nav link clicks: prevent anchor jump, use smooth scroll instead ────
function pdBindNavLinks(uid) {
  var nav = document.querySelector('#' + uid + ' .pd-month-nav');
  if (!nav) return;
  nav.addEventListener('click', function(e) {
    var a = e.target.closest('a[data-month]');
    if (!a) return;
    e.preventDefault();
    var target = document.getElementById(a.dataset.month);
    if (!target) return;
    pdScrolling[uid] = true;
    // Mark active immediately so observer doesn't need to
    nav.querySelectorAll('a').forEach(function(l) { l.classList.toggle('pd-nav-active', l === a); });
    var navCenter  = nav.offsetWidth / 2;
    var linkCenter = a.offsetLeft + a.offsetWidth / 2;
    nav.scrollTo({ left: linkCenter - navCenter, behavior: 'smooth' });
    pdScrollToSection(target);
    setTimeout(function() { pdScrolling[uid] = false; }, 900);
  });
}

// ── Bind date picker ─────────────────────────────────────────────────────────
function pdBindDatePicker(uid) {
  var picker = document.getElementById(uid + '_picker');
  if (!picker) return;
  var isMobile = ('ontouchstart' in window);
  var savedY   = 0;

  // Save scroll position the moment the picker gains focus.
  // After the picker closes the browser may scroll back to the input;
  // we restore savedY first so there is only one deliberate scroll.
  picker.addEventListener('focus', function() { savedY = window.pageYOffset; });

  // Only 'change' — never 'input'.
  // 'input' fires while the user is still spinning the drum wheel on Android,
  // which would call blur() and close the picker before they finish selecting.
  picker.addEventListener('change', function() {
    var val = picker.value;
    if (!val) return;
    setTimeout(function() {
      // Step 1: undo any browser scroll-to-input that happened when picker opened
      window.scrollTo(0, savedY);
      // Step 2: after that tiny settle, smoothly jump to the chosen month
      setTimeout(function() {
        pdJumpToDate(uid, val);
        setTimeout(function() { picker.value = ''; }, 500);
      }, isMobile ? 80 : 10);
    }, isMobile ? 320 : 0);
  });
}

<?php if ( $is_admin ) : ?>
// ── Admin: inline event editing ───────────────────────────────────────────────
function pdWidget(uid) { return document.getElementById(uid); }

function pdShowEditForm(uid, key) {
  var w    = pdWidget(uid); if (!w) return;
  var card = w.querySelector('.pd-event[data-key="' + key + '"]');
  var form = w.querySelector('.pd-edit-form[data-key="' + key + '"]');
  if (!card || !form) return;
  card.style.display = 'none';
  form.style.display = 'block';
  var ti = form.querySelector('[name="title"]');
  if (ti) ti.focus();
}

function pdCancelEdit(uid, key) {
  var w    = pdWidget(uid); if (!w) return;
  var card = w.querySelector('.pd-event[data-key="' + key + '"]');
  var form = w.querySelector('.pd-edit-form[data-key="' + key + '"]');
  if (!card || !form) return;
  form.style.display = 'none';
  card.style.display = '';
  var st = form.querySelector('.pd-edit-status');
  if (st) { st.textContent = ''; st.className = 'pd-edit-status'; }
}

function pdSaveEdit(uid, key) {
  var w = pdWidget(uid); if (!w) return;
  var form = w.querySelector('.pd-edit-form[data-key="' + key + '"]');
  if (!form) return;
  var btn = form.querySelector('.pd-edit-save');
  var st  = form.querySelector('.pd-edit-status');

  btn.disabled = true; btn.textContent = 'Saving\u2026';

  var params = new URLSearchParams({
    action:      'pd_save_override',
    nonce:       w.dataset.nonce   || '',
    post_id:     w.dataset.post    || '',
    widget_id:   w.dataset.widget  || '',
    event_key:   key,
    title:       form.querySelector('[name="title"]').value,
    date:        form.querySelector('[name="date"]').value,
    end_date:    form.querySelector('[name="end_date"]').value,
    type:        form.querySelector('[name="type"]').value,
    highlight:   form.querySelector('[name="highlight"]').checked ? '1' : '0',
    location:    form.querySelector('[name="location"]').value,
    description: form.querySelector('[name="description"]').value,
  });

  fetch(pdAjax, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params })
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.success) {
        var d   = res.data;
        var card = w.querySelector('.pd-event[data-key="' + key + '"]');
        if (card) {
          // Update title
          var titleEl = card.querySelector('.pd-event-title');
          if (titleEl) titleEl.textContent = d.title;

          // Update location
          var locEl = card.querySelector('.pd-event-location');
          if (d.location) {
            if (locEl) { locEl.textContent = '\uD83D\uDCCD ' + d.location; }
            else {
              var newLoc = document.createElement('div');
              newLoc.className = 'pd-event-location';
              newLoc.textContent = '\uD83D\uDCCD ' + d.location;
              if (titleEl) titleEl.after(newLoc);
            }
          } else if (locEl) { locEl.remove(); }

          // Update description
          var descEl = card.querySelector('.pd-event-desc');
          if (d.description) {
            if (descEl) { descEl.textContent = d.description; }
            else {
              var newDesc = document.createElement('div');
              newDesc.className = 'pd-event-desc';
              newDesc.textContent = d.description;
              var afterEl = card.querySelector('.pd-event-location') || titleEl;
              if (afterEl) afterEl.after(newDesc);
            }
          } else if (descEl) { descEl.remove(); }

          // Highlight class
          card.classList.toggle('pd-event--hl', !!d.highlight);

          // Mark as edited
          card.classList.add('pd-event--edited');
          var meta = card.querySelector('.pd-event-meta');
          if (meta && !meta.querySelector('.pd-edited-badge')) {
            var badge = document.createElement('span');
            badge.className = 'pd-edited-badge';
            badge.textContent = 'edited';
            meta.insertBefore(badge, meta.querySelector('.pd-edit-btn'));
          }

          // Add Revert button if not present
          if (meta && !meta.querySelector('.pd-revert-btn')) {
            var revert = document.createElement('button');
            revert.className = 'pd-revert-btn';
            revert.title = 'Revert to CSV original';
            revert.innerHTML = '&#8635; Revert';
            revert.dataset.key = key;
            meta.appendChild(revert);
          }

          // Update data-event JSON on edit button
          var editBtn = meta ? meta.querySelector('.pd-edit-btn') : null;
          if (editBtn) editBtn.dataset.event = JSON.stringify(Object.assign(JSON.parse(editBtn.dataset.event || '{}'), d));
        }

        pdCancelEdit(uid, key);
        btn.textContent = 'Save Changes';
        btn.disabled = false;
      } else {
        btn.textContent = 'Save Changes';
        btn.disabled = false;
        if (st) { st.textContent = (res.data && res.data.message) || 'Save failed.'; st.classList.add('show'); }
      }
    })
    .catch(function() {
      btn.textContent = 'Save Changes';
      btn.disabled = false;
      if (st) { st.textContent = 'Network error.'; st.classList.add('show'); }
    });
}

function pdDeleteOverride(uid, key) {
  var w = pdWidget(uid); if (!w) return;
  if (!confirm('Revert this event to its original CSV data?\nThe page will reload.')) return;

  fetch(pdAjax, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action:    'pd_delete_override',
      nonce:     w.dataset.nonce  || '',
      post_id:   w.dataset.post   || '',
      widget_id: w.dataset.widget || '',
      event_key: key,
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(res) { if (res.success) window.location.reload(); });
}

// Edit button / revert button via delegation
function pdBindAdminEvents(uid) {
  var w = pdWidget(uid); if (!w) return;
  w.addEventListener('click', function(e) {
    var editBtn   = e.target.closest('.pd-edit-btn');
    var cancelBtn = e.target.closest('.pd-edit-cancel');
    var saveBtn   = e.target.closest('.pd-edit-save');
    var revertBtn = e.target.closest('.pd-revert-btn');

    if (editBtn) {
      var ev  = JSON.parse(editBtn.dataset.event || '{}');
      var key = ev.event_key || '';
      if (!key) return;
      // Pre-fill form
      var form = w.querySelector('.pd-edit-form[data-key="' + key + '"]');
      if (form) {
        var set = function(n, v) { var el = form.querySelector('[name="' + n + '"]'); if (el) { if (el.type === 'checkbox') el.checked = !!v; else el.value = v || ''; } };
        set('title', ev.title); set('date', ev.date); set('end_date', ev.end_date);
        set('type', ev.type); set('highlight', ev.highlight);
        set('location', ev.location); set('description', ev.description);
      }
      pdShowEditForm(uid, key);
    }
    if (cancelBtn) {
      var form2 = cancelBtn.closest('.pd-edit-form');
      if (form2) pdCancelEdit(uid, form2.dataset.key);
    }
    if (saveBtn) {
      var form3 = saveBtn.closest('.pd-edit-form');
      if (form3) pdSaveEdit(uid, form3.dataset.key);
    }
    if (revertBtn) {
      pdDeleteOverride(uid, revertBtn.dataset.key);
    }
  });
}
<?php endif; // is_admin ?>
<?php endif; // print_shared ?>

// ── Per-instance init ────────────────────────────────────────────────────────
(function() {
  var uid = <?php echo wp_json_encode( $uid ); ?>;
  var k   = uid + '_theme';
  try {
    if (localStorage.getItem(k) === 'dark') {
      var w = document.getElementById(uid);
      var l = document.getElementById(uid + '_lbl');
      if (w) w.classList.add('pd-dark');
      if (l) l.textContent = 'Light';
    }
  } catch(e) {}
  function pdInit() {
    pdInitObserver(uid);
    pdBindNavLinks(uid);
    pdBindDatePicker(uid);
    <?php if ( $is_admin ) : ?>pdBindAdminEvents(uid);<?php endif; ?>
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', pdInit);
  } else {
    pdInit();
  }
})();
</script>
        <?php
        echo ob_get_clean();
    }

    // =========================================================================
    // SHARED CSS
    // =========================================================================
    private function print_shared_css() {
        ob_start();
        ?>
<style id="pastoral-diary-shared-css">
.pd-widget *{box-sizing:border-box;margin:0;padding:0;}
.pd-widget{
  --pd-accent:#b8922f;--pd-accent-lt:#d4a94a;
  --pd-hero-bg:#14213d;--pd-page-bg:#faf7f2;--pd-surface:#f0ead9;
  --pd-text:#1a1a1a;--pd-muted:#888;--pd-border:#e0d4b8;
  --pd-font-head:'Cormorant Garamond',serif;--pd-font-body:'Jost',sans-serif;
  --pd-title-size:48px;--pd-title-wt:300;--pd-body-size:14px;--pd-kicker-spc:0.22em;
  font-family:var(--pd-font-body);background:var(--pd-page-bg);color:var(--pd-text);position:relative;
}
.pd-widget.pd-dark{--pd-page-bg:#111418;--pd-surface:#1a1f28;--pd-text:#e8e0d0;--pd-muted:#555;--pd-border:#2a2820;}

/* Hero */
.pd-hero{background:var(--pd-hero-bg);padding:56px 48px 44px;text-align:center;position:relative;border-bottom:2px solid var(--pd-accent);}
.pd-kicker{font-family:var(--pd-font-body);font-size:11px;letter-spacing:var(--pd-kicker-spc);text-transform:uppercase;color:var(--pd-accent-lt);margin-bottom:16px;}
.pd-title{font-family:var(--pd-font-head);font-size:var(--pd-title-size);font-weight:var(--pd-title-wt);color:#fff;line-height:1.15;letter-spacing:.02em;}
.pd-divider{display:flex;align-items:center;justify-content:center;margin:18px auto;width:80px;}
.pd-divider span{flex:1;height:1px;background:var(--pd-accent);position:relative;}
.pd-divider span::before,.pd-divider span::after{content:'';position:absolute;top:50%;width:5px;height:5px;border-radius:50%;background:var(--pd-accent);transform:translateY(-50%);}
.pd-divider span::before{left:-7px;}.pd-divider span::after{right:-7px;}
.pd-subtitle{font-family:var(--pd-font-body);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.3);}

/* Dark toggle */
.pd-theme-btn{position:absolute;top:14px;right:18px;display:inline-flex;align-items:center;gap:7px;background:none;border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:5px 12px 5px 8px;color:rgba(255,255,255,.6);font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-family:var(--pd-font-body);cursor:pointer;transition:border-color .2s,color .2s;}
.pd-theme-btn:hover{border-color:var(--pd-accent-lt);color:var(--pd-accent-lt);}
.pd-toggle-track{width:26px;height:14px;border-radius:7px;background:rgba(255,255,255,.15);position:relative;transition:background .3s;}
.pd-widget.pd-dark .pd-toggle-track{background:var(--pd-accent);}
.pd-toggle-thumb{position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#fff;transition:transform .3s;}
.pd-widget.pd-dark .pd-toggle-thumb{transform:translateX(12px);}
.pd-sun-icon{display:inline;}.pd-moon-icon{display:none;}
.pd-widget.pd-dark .pd-sun-icon{display:none;}.pd-widget.pd-dark .pd-moon-icon{display:inline;}

/* Nav wrap: month tabs + date jump side by side */
.pd-nav-wrap{display:flex;align-items:stretch;background:var(--pd-surface);border-bottom:1px solid var(--pd-border);}
.pd-month-nav{display:flex;overflow-x:auto;scrollbar-width:none;flex:1;padding:0 16px;}
.pd-month-nav::-webkit-scrollbar{display:none;}
.pd-month-nav a{flex-shrink:0;display:flex;align-items:center;gap:4px;padding:11px 12px;font-family:var(--pd-font-body);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--pd-muted);text-decoration:none;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;}
.pd-month-nav a:hover,.pd-month-nav a.pd-nav-active{color:var(--pd-accent);border-bottom-color:var(--pd-accent);}
.pd-nav-badge{font-size:9px;opacity:.5;font-weight:400;}

/* Date jump toolbar */
.pd-nav-jump{display:flex;align-items:center;gap:8px;padding:6px 16px;border-left:1px solid var(--pd-border);flex-shrink:0;}
.pd-date-input{font-family:var(--pd-font-body);font-size:11px;border:1px solid var(--pd-border);border-radius:3px;padding:5px 8px;background:var(--pd-page-bg);color:var(--pd-text);outline:none;cursor:pointer;max-width:130px;transition:border-color .2s;}
.pd-date-input:focus{border-color:var(--pd-accent);}
.pd-today-btn{font-family:var(--pd-font-body);font-size:10px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--pd-accent);border-radius:3px;padding:5px 11px;background:none;color:var(--pd-accent);cursor:pointer;transition:all .2s;white-space:nowrap;}
.pd-today-btn:hover{background:var(--pd-accent);color:#fff;}

/* Year separator */
.pd-year-sep{display:flex;align-items:center;gap:16px;padding:32px 32px 0;opacity:.5;}
.pd-year-sep::before,.pd-year-sep::after{content:'';flex:1;height:1px;background:var(--pd-border);}
.pd-year-sep span{font-family:var(--pd-font-head);font-size:13px;letter-spacing:.2em;color:var(--pd-muted);text-transform:uppercase;flex-shrink:0;}

/* Timeline */
.pd-timeline{max-width:940px;margin:0 auto;padding:32px 32px 72px;}
.pd-empty{text-align:center;padding:48px;color:var(--pd-muted);font-size:14px;}
.pd-month{display:grid;grid-template-columns:155px 1fr;gap:0 40px;position:relative;}
.pd-month::before{content:'';position:absolute;left:155px;top:0;bottom:0;width:1px;background:var(--pd-border);}
.pd-month-label{padding:32px 0;text-align:right;position:sticky;top:44px;align-self:start;}
.pd-month-num{display:block;font-family:var(--pd-font-head);font-weight:300;font-size:58px;line-height:1;color:var(--pd-surface);}
.pd-widget.pd-dark .pd-month-num{color:#222830;}
.pd-month-name{display:block;font-family:var(--pd-font-body);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--pd-accent);}
.pd-month-events{padding:32px 0 32px 40px;}

/* Events */
.pd-event{display:flex;gap:14px;padding:10px 0;border-bottom:1px solid rgba(224,212,184,.3);align-items:flex-start;position:relative;}
.pd-widget.pd-dark .pd-event{border-bottom-color:rgba(42,40,32,.5);}
.pd-event:last-child{border-bottom:none;}
.pd-event::before{content:'';position:absolute;left:-44px;top:16px;width:7px;height:7px;border-radius:50%;background:var(--pd-surface);border:1.5px solid var(--pd-border);}
.pd-event--hl::before{background:var(--pd-accent);border-color:var(--pd-accent);}
.pd-event-date{flex-shrink:0;width:84px;font-family:var(--pd-font-body);font-size:11px;letter-spacing:.06em;color:var(--pd-muted);padding-top:2px;text-transform:uppercase;}
.pd-event-body{flex:1;min-width:0;}
.pd-event-title{font-family:var(--pd-font-body);font-size:var(--pd-body-size);color:var(--pd-text);line-height:1.5;font-weight:400;}
.pd-event--hl .pd-event-title{font-weight:500;}
.pd-event-location{font-size:11px;color:var(--pd-muted);margin-top:2px;letter-spacing:.02em;}
.pd-event-desc{font-size:12px;color:var(--pd-muted);margin-top:3px;line-height:1.5;font-style:italic;}
.pd-event-meta{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:5px;}

/* Tags */
.pd-tag{display:inline-block;font-family:var(--pd-font-body);font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px;border-radius:2px;}
.pd-tag-mass{background:#f5edd8;color:#8a6a1a;}
.pd-tag-visit,.pd-tag-pastoralvisit{background:#e8f0f8;color:#2a5480;}
.pd-tag-meeting{background:#f0ede8;color:#5c4a30;}
.pd-tag-retreat{background:#edf2eb;color:#3a5c34;}
.pd-tag-special{background:#fae8e8;color:#803030;}
.pd-tag-ordination{background:#ede8f5;color:#4a2a80;}
.pd-tag-easter{background:#fff8e0;color:#806020;}
.pd-tag-lent{background:#f0edf8;color:#5a3a7a;}
.pd-tag-youth{background:#e8f5f0;color:#2a6050;}
/* Dark mode tag overrides */
.pd-widget.pd-dark .pd-tag-mass{background:#2a2010;color:#d4a94a;}
.pd-widget.pd-dark .pd-tag-visit,.pd-widget.pd-dark .pd-tag-pastoralvisit{background:#0d1f33;color:#7ab3e0;}
.pd-widget.pd-dark .pd-tag-meeting{background:#1e1a14;color:#b09070;}
.pd-widget.pd-dark .pd-tag-retreat{background:#111f0e;color:#7ab068;}
.pd-widget.pd-dark .pd-tag-special{background:#201010;color:#d07070;}
.pd-widget.pd-dark .pd-tag-ordination{background:#1a1030;color:#b090e0;}
.pd-widget.pd-dark .pd-tag-easter{background:#242010;color:#c8a030;}
.pd-widget.pd-dark .pd-tag-lent{background:#18102a;color:#a080d0;}
.pd-widget.pd-dark .pd-tag-youth{background:#102018;color:#7ab068;}

/* Google Calendar */
.pd-gcal{display:inline-flex;align-items:center;gap:4px;font-family:var(--pd-font-body);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--pd-accent);text-decoration:none;border:1px solid var(--pd-accent);border-radius:3px;padding:2px 7px;transition:all .2s;}
.pd-gcal:hover{background:var(--pd-accent);color:#fff;}
.pd-gcal svg{stroke:currentColor;flex-shrink:0;}

/* Edited badge */
.pd-edited-badge{font-family:var(--pd-font-body);font-size:9px;letter-spacing:.06em;text-transform:uppercase;background:#e8f5f0;color:#2a6050;border-radius:2px;padding:1px 5px;}
.pd-widget.pd-dark .pd-edited-badge{background:#102018;color:#7ab068;}

/* Admin: edit & revert buttons */
.pd-edit-btn,.pd-revert-btn{font-family:var(--pd-font-body);font-size:10px;letter-spacing:.06em;text-transform:uppercase;background:none;border-radius:3px;padding:2px 7px;cursor:pointer;transition:all .2s;}
.pd-edit-btn{border:1px solid var(--pd-border);color:var(--pd-muted);}
.pd-edit-btn:hover{border-color:var(--pd-accent);color:var(--pd-accent);}
.pd-revert-btn{border:1px solid rgba(192,60,60,.25);color:#b83c3c;}
.pd-revert-btn:hover{background:#b83c3c;color:#fff;border-color:#b83c3c;}

/* Inline edit form */
.pd-edit-form{background:var(--pd-surface);border:1px solid var(--pd-border);border-radius:6px;padding:16px;margin:6px 0 12px;}
.pd-edit-form-title{font-family:var(--pd-font-body);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--pd-accent);font-weight:500;margin-bottom:12px;}
.pd-edit-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.pd-edit-full{grid-column:1 / -1;}
.pd-edit-field{display:flex;flex-direction:column;gap:3px;}
.pd-edit-label{font-family:var(--pd-font-body);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--pd-muted);}
.pd-edit-input,.pd-edit-select,.pd-edit-textarea{font-family:var(--pd-font-body);font-size:13px;border:1px solid var(--pd-border);border-radius:3px;padding:6px 9px;background:var(--pd-page-bg);color:var(--pd-text);width:100%;outline:none;transition:border-color .2s;}
.pd-edit-input:focus,.pd-edit-select:focus,.pd-edit-textarea:focus{border-color:var(--pd-accent);}
.pd-edit-textarea{resize:vertical;min-height:56px;}
.pd-edit-checkbox-row{display:flex;align-items:center;gap:8px;margin-top:2px;}
.pd-edit-checkbox-row input[type="checkbox"]{width:14px;height:14px;accent-color:var(--pd-accent);flex-shrink:0;}
.pd-edit-actions{display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap;}
.pd-edit-save{font-family:var(--pd-font-body);font-size:11px;letter-spacing:.08em;text-transform:uppercase;border:none;border-radius:3px;padding:7px 18px;background:var(--pd-accent);color:#fff;cursor:pointer;transition:opacity .2s;}
.pd-edit-save:hover{opacity:.85;}.pd-edit-save:disabled{opacity:.5;cursor:not-allowed;}
.pd-edit-cancel{font-family:var(--pd-font-body);font-size:11px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--pd-border);border-radius:3px;padding:7px 14px;background:none;color:var(--pd-muted);cursor:pointer;transition:all .2s;}
.pd-edit-cancel:hover{border-color:var(--pd-muted);color:var(--pd-text);}
.pd-edit-status{font-size:11px;color:#b83c3c;display:none;}
.pd-edit-status.show{display:inline;}

/* ── Next-event indicator (PHP-rendered, always visible) ─────────────────── */
.pd-next-divider{
  display:flex;align-items:center;gap:8px;
  margin:10px 0 6px;pointer-events:none;user-select:none;
}
.pd-next-divider::before,.pd-next-divider::after{
  content:'';flex:1;height:1px;background:var(--pd-accent);opacity:.35;
}
.pd-next-divider-label{
  font-family:var(--pd-font-body);font-size:9px;letter-spacing:.18em;
  text-transform:uppercase;font-weight:600;color:var(--pd-accent);white-space:nowrap;
}
.pd-next-divider-icon{
  flex-shrink:0;stroke:var(--pd-accent);
  animation:pdArrowBounce 1.8s ease-in-out infinite;
}
@keyframes pdArrowBounce{0%,100%{transform:translateX(0);}50%{transform:translateX(4px);}}
/* Pulse the timeline bullet of the next event */
.pd-event--next::before{
  background:var(--pd-accent)!important;border-color:var(--pd-accent)!important;
  animation:pdBulletGlow 2s ease-in-out infinite;
}
@keyframes pdBulletGlow{0%,100%{opacity:1;}50%{opacity:.3;}}

/* Print */
@media print {
  .pd-theme-btn,.pd-month-nav,.pd-nav-wrap,.pd-gcal,.pd-edit-btn,.pd-revert-btn,.pd-edit-form{display:none!important;}
  .pd-hero{padding:24px;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  .pd-timeline{padding:16px 0;}
  .pd-month{display:block;}
  .pd-month::before{display:none;}
  .pd-month-label{position:static;text-align:left;padding:12px 0 4px;}
  .pd-month-num{font-size:32px;}
  .pd-month-events{padding:0;}
  .pd-event::before{display:none;}
}

/* Responsive */
@media(max-width:680px){
  .pd-hero{padding:44px 20px 36px;}
  .pd-theme-btn{position:static;display:flex;margin:0 auto 14px;}
  .pd-nav-wrap{flex-direction:column;}
  .pd-month-nav{padding:0 12px;}
  .pd-nav-jump{border-left:none;border-top:1px solid var(--pd-border);padding:8px 12px;justify-content:flex-start;}
  .pd-date-input{max-width:none;flex:1;}
  .pd-timeline{padding:20px 16px 48px;}
  .pd-month{grid-template-columns:1fr;}
  .pd-month::before{display:none;}
  .pd-month-label{padding:22px 0 4px;text-align:left;position:static;}
  .pd-month-num{font-size:42px;}
  .pd-month-events{padding:0 0 20px;}
  .pd-event::before{display:none;}
  .pd-year-sep{padding:20px 0 0;}
  .pd-edit-grid{grid-template-columns:1fr;}
  .pd-edit-full{grid-column:1;}
}
</style>
        <?php
        echo ob_get_clean();
    }
}
