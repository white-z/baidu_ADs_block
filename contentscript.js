const list = [
  'CSDN',
  '博客园',
  '百度经验',
  '脚本之家',
  '51CTO技术博客',
  'cnblogs.com'
]

init();
change();

function handleInserted () {
  $('.c-container').each(function() {
    const that = $(this);
    if(that.attr('tpl') == 'open_source_software_blog') {
      that.remove();
    }
    if(that.attr('id') == 1) {
      that.remove();
    }
  })
  init();
}

function init() {
  $('#su').val('搜 索');
  $('iframe').remove();
  $('.c-container').each(function() {
    const that = $(this);
    that.children('.c-abstract').find('a').remove();
    that.find('h3.t').each(function() {
      const a = $(this);
      const html = a.html();
      list.forEach(el => {
        if(html.indexOf(el) > -1) {
          that.remove();
        }
      });
    });
    that.find('.c-showurl').each(function() {
      const a = $(this);
      const html = a.html();
      list.forEach(el => {
        if(html.indexOf(el) > -1) {
          that.remove();
        }
      })
    })
  });
}

function change() {
  $('.c-container').each(function() {
    const that = $(this);
    that.find('.c-showurl').each(function() {
      const a = $(this);
      const html = a.html();
      a.parent().append(`<span class="a-spans">${html}<span>`);
      a.remove();
    })
  })
}
$(document).bind('DOMNodeInserted', function(e) {
   handleInserted();
});
$(document).on('click', 'a', function(e) {
  e.stopPropagation();
})
let opening = false;
$(document).on('click', '.c-container', function(e) {
  e.stopPropagation();
  e.preventDefault();
  const that = $(this);
  let href = that.children('.t').children('a').attr('href')
  if(! href) {
    return;
  }
  if(opening === false) {
    opening = true;
    href = href.replace(/http/i, 'https');
    that.addClass('opening');
    that.attr('style', `transform: translate(-${that[0].getBoundingClientRect().left - 70}px, -${that[0].getBoundingClientRect().top + 100}px)`);
    setTimeout(function() {
      opening = false;
      window.location.href = href;
    }, 200)
  }
})
