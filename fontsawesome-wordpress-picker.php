<?php

  /*
  * Plugin Name: Fonts Awesome WP Picker
  * Plugin URI: https://github.com/victorandeloci/fontsawesome-wordpress-picker
  * Description: WordPress plugin to use Fonts Awesome icons on posts and pages
  * Version: 1.0.0
  * Author: Victor Andeloci
  * Author URI: https://github.com/victorandeloci
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
