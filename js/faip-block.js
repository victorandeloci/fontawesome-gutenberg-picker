/*
  This file is part of Icons Picker for FontAwesome.

  Icons Picker for FontAwesome is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Icons Picker for FontAwesome is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Icons Picker for FontAwesome.  If not, see <https://www.gnu.org/licenses/>
*/

const htmlToElem = ( html ) => wp.element.RawHTML( { children: html } );

function renderHtmlIconBlock(icons){

  let htmlBlock = '';

  const entries = Object.entries(icons);
  entries.forEach((item, i) => {

    let suffix;

    switch (item[1].free[0]) {
      case 'brands':
        suffix = 'b';
        break;
      case 'solid':
        suffix = 's';
        break;
      default:
        suffix = 'b';
    }

    htmlBlock += '<i title="' + item[1].label + '" class="fwp-icon fa' + suffix + ' fa-' + item[0] + '" data-class="fa' + suffix + ' fa-' + item[0] + '"></i>';

  });

  return htmlBlock;
}

function checkForLocalIcons(){

  if(localStorage.getItem('icons') != null){

    var retrievedIcons = JSON.parse(localStorage.getItem('icons'));
    return htmlToElem(renderHtmlIconBlock(retrievedIcons));

  } else {
    return '';
  }

}

wp.blocks.registerBlockType('faip/icons', {
  title: 'Icons Picker for FontAwesome',
  icon: 'image-filter',
  attributes: {
    content: {type: 'string'}
  },
  category: 'common',
  edit: function(props) {

    if(!props.attributes.content)
      props.attributes.content = '';

    //reset click listeners
    jQuery(document).off('click', '.fwp-icon');
    jQuery(document).on('click', '.fwp-icon', function(){

  	  let iconHtml = '<i title="' + jQuery(this).attr('title') + '" class="' + jQuery(this).attr('data-class') + ' displayed-icon"></i>';
  	  props.setAttributes({content: props.attributes.content + iconHtml});

    });

    jQuery(document).off('click', '.displayed-icon');
    jQuery(document).on('click', '.displayed-icon', function(){

  	  let element = jQuery(this).get()[0].outerHTML;
  	  let tempProps = props.attributes.content.replace(element, '');

      props.setAttributes({content: tempProps});

      jQuery(this).remove();

    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h4',
        { style: { color: "#666" } },
        'Icons Picker for FontAwesome'
      ),
      React.createElement(
        'div',
        {
          id: 'iconsDisplayContainer',
          className: 'selected-icons-display'
        },
        htmlToElem( props.attributes.content )
      ),
      React.createElement(
        "div",
        {
          id: 'iconsSelectorContainer',
          className: 'icons-container'
        },
        checkForLocalIcons()
      )
    );
  },
  save: function(props) {
    return (
      htmlToElem( props.attributes.content )
    );
  }
});

jQuery(document).ready(function(){

  if(localStorage.getItem('icons') === null){
    jQuery.getJSON(
      js_data.icons_json,
      function(data) {

        const icons = JSON.parse(JSON.stringify(data));

        localStorage.setItem('icons', JSON.stringify(icons));

        if(jQuery('#iconsSelectorContainer'))
          jQuery('#iconsSelectorContainer').append(renderHtmlIconBlock(icons));

      }
    );
  }

});
