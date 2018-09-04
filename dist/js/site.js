
// tabs
function showPane(pane) {
    $('[data-tab-pane]').removeClass('active');
    $('[data-tab-pane="' + pane + '"]').addClass('active');
}

$('[data-tab-btn]').click(function (e) {
    e.preventDefault();
    $('[data-tab-btn]').removeClass('active');
    $(this).addClass('active');
    let btn = $(this).attr('data-tab-btn');
    showPane(btn);
});