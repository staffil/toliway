
    const apikey1 = '48416253716b696d3236534a494971';
    const url1 = `http://openapi.seoul.go.kr:8088/${apikey1}/json/mgisToiletPoi/1/500`;
    function loadSeoullocation(){
        fetch(url1)
            .then (response => response.json())
            .then (data => parseSeouliJSON(data))
            .catch(error => console.error(error));
    }
    function parseSeouliJSON(data) {
        const keyword = document.getElementById('row').value.trim();
        const toilet1 = data.mgisToiletPoi.row;
        const table = [];
        table.push("<tr><th>구</th><th>건물이름</th><th>남성 여성 대변기 수</th><th>개방 여부</th><th>장소 유형</th><th>개방시간</th><th>주소</th></tr>");

        for (const e of toilet1) {
            if (e.GU_NAME.includes(keyword) || e.ADDR_NEW.includes(keyword) || e.CONTS_NAME.includes(keyword)) {
                table.push(`
                <tr>
                    <td>${e.GU_NAME || '-'}</td>
                    <td>${e.CONTS_NAME}</td>
                    <td>${e.VALUE_04 || '-'}</td>
                    <td>${e.VALUE_01 || '-'}</td>
                    <td>${e.VALUE_03 || '-'}</td>
                    <td>${e.OPEN_TM_INFO || '-'}</td>
                    <td>${e.ADDR_NEW || '-'}</td>
                </tr>
            `);
            }
        }

        document.getElementById('demoJSON').innerHTML = table.join('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        loadGyeonggiToiletInfo();
        loadSeoullocation()
    }




