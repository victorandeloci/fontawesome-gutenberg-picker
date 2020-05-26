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

function renderBlock(){
  wp.blocks.registerBlockType('fwp/icons', {
    title: 'FontsAwesome Icons Picker',
    icon: 'welcome-add-page',
    attributes: {
      content: {type: 'string'}
    },
    category: 'common',
    edit: function(props) {
      function updateContent(event) {
        props.setAttributes({content: event.target.value})
      }
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h4',
          { style: { color: "#666" } },
          'Fonts Awesome Icon Picker'
        ),
        React.createElement(
          'div',
          {
            id: 'iconsDisplayContainer',
            className: 'selected-icons-display'
          }
        ),
        React.createElement(
          'input',
          {
            id: 'selectedIcons',
            type: 'hidden',
            placeholder: 'Selected Icons',
            value: props.attributes.content,
            onChange: updateContent
          }
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
        //htmlToElem( props.attributes.content )
        props.attributes.content
      );
    }
  })
}

function insertIconContent(dataClass){

  let iconHtml = '<i class="' + dataClass + '"></i>'

  $('#selectedIcons').val($('#selectedIcons').val() + iconHtml);
  $('#iconsDisplayContainer').append(iconHtml);

}

function checkForLocalIcons(){

  if(localStorage.getItem('icons') != null){

    var retrievedIcons = JSON.parse(localStorage.getItem('icons'));
    return htmlToElem(renderHtmlIconBlock(retrievedIcons));

  } else {
    return '';
  }

}

renderBlock();

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

  $(document).on('click', '.fwp-icon', function(){
    insertIconContent($(this).attr('data-class'));
  });

});
