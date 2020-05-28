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
  title: 'FA Icons Picker',
  icon: 'image-filter',
  attributes: {
    content: {type: 'string'}
  },
  category: 'common',
  edit: function(props) {

    if(!props.attributes.content)
      props.attributes.content = '';

    //reset click listeners
    $(document).off('click', '.fwp-icon');
    $(document).on('click', '.fwp-icon', function(){

  	  let iconHtml = '<i title="' + $(this).attr('title') + '" class="' + $(this).attr('data-class') + ' displayed-icon"></i>';
  	  props.setAttributes({content: props.attributes.content + iconHtml});

    });

    $(document).off('click', '.displayed-icon');
    $(document).on('click', '.displayed-icon', function(){

  	  let element = $(this).get()[0].outerHTML;
  	  let tempProps = props.attributes.content.replace(element, '');

      props.setAttributes({content: tempProps});

      $(this).remove();

    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h4',
        { style: { color: "#666" } },
        'FA Icons Picker'
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

$(document).ready(function(){

  if(localStorage.getItem('icons') === null){
    $.getJSON(
      'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json',
      function(data) {

        const icons = JSON.parse(JSON.stringify(data));

        localStorage.setItem('icons', JSON.stringify(icons));

        if($('#iconsSelectorContainer'))
          $('#iconsSelectorContainer').append(renderHtmlIconBlock(icons));

      }
    );
  }

});
