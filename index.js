$(document).ready(function() {
  const btn = $('.mui-switch');
  let isOpen = window.localStorage.getItem('open') == 1;
  if(isOpen) {
    btn.addClass('mui-active');
    btn.children('.mui-switch-handle').addClass('active');
  }
  sendMessage();
})
$(document).on('click', '.mui-switch', function() {
  const that = $(this);
  that.toggleClass('mui-active');
  that.children('.mui-switch-handle').toggleClass('active');
  window.localStorage.setItem('open', that.hasClass('mui-active') ? 1 : 0);
  sendMessage();
})

function sendMessage() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    let message = {
      info: window.localStorage.getItem('open')
    }
    chrome.tabs.sendMessage(tabs[0].id, message, res => {
      
    })
  })
}
