<?php

  /*
    This file is part of FontAwesome WordPress Picker.

    FontAwesome WordPress Picker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    FontAwesome WordPress Picker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with FontAwesome WordPress Picker.  If not, see <https://www.gnu.org/licenses/>
  */

  /*
  * Plugin Name: Font Awesome WP Picker
  * Plugin URI: https://github.com/victorandeloci/fontawesome-wordpress-picker
  * Description: WordPress plugin to use Font Awesome icons on posts and pages as a Gutenberg block
  * Version: 0.9.0
  * Author: Victor Andeloci
  * Author URI: https://github.com/victorandeloci
  * License: GPLv3
  * License URI: https://www.gnu.org/licenses/gpl-3.0.pt-br.html
  */

  function loadFwpBlock() {

    wp_enqueue_script(
      'jquery-3.5.1',
      'https://code.jquery.com/jquery-3.5.1.min.js',
      array(),
      true
    );

    wp_enqueue_script(
      'fwp-block',
      plugin_dir_url(__FILE__) . 'js/fwp-block.js',
      array('wp-blocks','wp-editor'),
      true
    );

    wp_enqueue_style(
      'all-min',
      plugin_dir_url(__FILE__) . 'css/all.min.css',
      null,
      '5.12.1',
      'screen'
    );

    wp_enqueue_style(
      'style',
      plugin_dir_url(__FILE__) . 'css/style.css',
      null,
      '0.1.0',
      'screen'
    );

  }
  add_action('enqueue_block_editor_assets', 'loadFwpBlock');
