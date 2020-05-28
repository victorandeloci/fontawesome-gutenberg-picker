<?php

  /*
    This file is part of FA Icons Picker.

    FA Icons Picker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    FA Icons Picker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with FA Icons Picker.  If not, see <https://www.gnu.org/licenses/>
  */

  /*
  * Plugin Name: FA Icons Picker
  * Plugin URI: https://github.com/victorandeloci/fontawesome-wordpress-picker
  * Description: WordPress plugin to use Font Awesome icons on posts and pages as a Gutenberg block
  * Version: 0.9.0
  * Author: Victor Andeloci
  * Author URI: https://github.com/victorandeloci
  * License: GPLv3
  * License URI: https://www.gnu.org/licenses/gpl-3.0.pt-br.html
  */

  function loadFaIpBlock() {

    wp_enqueue_script(
      'jquery-3.5.1',
      'https://code.jquery.com/jquery-3.5.1.min.js',
      array(),
      true
    );

    wp_enqueue_script(
      'faip-block',
      plugin_dir_url(__FILE__) . 'js/faip-block.js',
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
      '1.0.0',
      'screen'
    );

  }
  add_action('enqueue_block_editor_assets', 'loadFaIpBlock');
