$(document).ready(function() {
    const $muyuImage = $('#muyuImage');
    const $countDisplay = $('#countDisplay');
    const $meritText = $('#meritText');
    const audioUrl = $('#muyuAppContainer').data('audio-url'); 
    const muyuSound = new Audio(audioUrl);
    muyuSound.preload = 'auto';
    function playMuyuSound() {
        muyuSound.currentTime = 0; 
        muyuSound.play().catch(e => {
            console.error("音效播放失敗，可能是瀏覽器限制或檔案不存在:", e);
        });
    }
    $muyuImage.on('click', function() {
        playMuyuSound();
        $muyuImage.addClass('muyu-click-effect');
        setTimeout(() => {
            $muyuImage.removeClass('muyu-click-effect');
        }, 100);
        $meritText.removeClass('fade-up');
        setTimeout(() => {
            $meritText.addClass('fade-up');
        }, 10);
        $.ajax({
            type: "POST", 
            url: "/click_muyu", 
            contentType: "application/json", 
            success: function(response) {
                if(response.success) {
                    $countDisplay.text(response.new_count);
                } else {
                    console.error('後端處理失敗。');
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX 錯誤:", status, error);
            }
        });
    });
});