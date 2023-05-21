export const linkShare = () => {
  var url = document.getElementById('shareLinkId');
  url.select();
  document.execCommand('copy');
};
