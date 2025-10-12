(function () {
    $(document).ready(function () {

        const $menu = $('#menuBox');
        const $dropdown = $menu.find('.dropdown');



        // 메뉴 마우스 창 열기
        let isOpen = false;

        $menu.hover( // 마우스를 대면
            function () {
                if (!isOpen) { // true로 변환
                    isOpen = true;
                    $dropdown.stop( true).slideDown(400);
                }
            },
            function () {
                if (isOpen) {
                    isOpen = false;
                    $dropdown.stop( true).slideUp(200);
                }
            }
        );


    });
})();

{
    // 로그인 (아이디, 비밀번호)
    function chkid() {
        let idpat = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
        let passwordPat = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/~`|\\]).{8,20}$/;

        const frm = document.forms['loginForm'];

        // match는 일치하지 않을 경우 null 값, test 는 boolean 으로 반환함
        if (!idpat.test(frm['idName'].value.trim())) {
            alert('아이디 입력이 잘못되었습니다');
            return false;
        }
        if (!passwordPat.test(frm['passwordName'].value.trim())) {
            alert('비밀번호 입력이 잘못되었습니다');
            return false;
        }
        if(frm.value.length === 0){
            alert('아이디를 입력해 주세요')
            return false;
        }


        return true;
    }

}

// 지하철 스크린
{
    function moveleft() {
        const $subway = $('#subway');

        $subway.css('position', 'relative');

        $subway.animate({
            left: '-1800px',
        }, 9000, function () { // 콜백
            $subway.animate({
                left: '-10',
            },9000);
            moveleft();

        });

    }

    $(document).ready(function () {
        moveleft();
    });

}
