$(document).ready(function() {
    // ⚠️ 請填入你在 Render 部署獲得的後端網址 ⚠️
    const API_BASE_URL = 'https://test-7q3x.onrender.com';

    const $muyuImage = $('#muyuImage');
    const $countDisplay = $('#countDisplay');
    const $meritText = $('#meritText');
    
    // 音效載入
    const muyuSound = new Audio('static/sound.mp3');
    muyuSound.preload = 'auto';

    function playMuyuSound() {
        muyuSound.currentTime = 0; 
        muyuSound.play().catch(e => {
            console.error("音效播放失敗，可能是瀏覽器限制或檔案不存在:", e);
        });
    }

    // 初始化：獲取目前功德數
    $.get(`${API_BASE_URL}/api/get_count`, function(data) {
        $countDisplay.text(data.count);
    });

    // 點擊木魚觸發
    $muyuImage.on('click', function() {
        playMuyuSound();

        // 點擊縮放效果
        $muyuImage.addClass('muyu-click-effect');
        setTimeout(() => {
            $muyuImage.removeClass('muyu-click-effect');
        }, 100);

        // 飄字動畫
        $meritText.removeClass('fade-up');
        setTimeout(() => {
            $meritText.addClass('fade-up');
        }, 10);

        // 發送 API 到 Render 後端
        $.ajax({
            type: "POST", 
            url: `${API_BASE_URL}/api/click_muyu`, 
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
