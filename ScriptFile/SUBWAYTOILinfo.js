



    const apiKey = '5qBiFEU%2BuYHO9Zjud6Q49WK4eGue0JFieDXq0FgpDywbDCzYw3NAbKLy5EZlkDZfJ3G0t5lIyEnV4KFLTj64Jw%3D%3D';
    const urlBase = `https://api.odcloud.kr/api/15044453/v1/uddi:5f01eed0-172a-46be-9140-ecd60fc4e792?page=1&perPage=400&serviceKey=${apiKey}`;

    function loadToiletInfo() {
        fetch(urlBase)
            .then(response => response.json())
            .then(data => parseJSON(data))
            .catch(err => {
                alert("API 호출 실패. 키가 유효한지 확인해주세요.");
                console.error(err);
            });
    }

    function parseJSON(data) {
        const keyword = document.getElementById('row').value.trim(); // 입력값
        const table = [];
        table.push("<tr><th>역이름</th><th>남성용 대변기 수</th><th>여성용 대변기 수</th><th>위치</th><th>남녀공용화장실여부</th><th>남성용-장애인용대변기수</th><th>여성용-장애인용대변기수</th><th>화장실설치장소유형</th>");

        const filtered = data.data.filter(e =>
            (e.화장실명 && e.화장실명.includes(keyword))

        );

        for ( e of filtered) {
            table.push(`
                <tr>
                    <td>${e.화장실명 || ''}</td>
                    <td>${e["남성용-대변기수"] || ''}</td>
                    <td>${e["여성용-대변기수"] || ''}</td>
                    <td>${e.소재지도로명주소	 || ''}</td>
                    <td>${e.남녀공용화장실여부 || ''}</td>
                    <td>${e["남성용-장애인용대변기수"] || ''}</td>
                    <td>${e["여성용-장애인용대변기수"] || ''}</td>
                     <td>${e.화장실설치장소유형	 || ''}</td>
              
                </tr>
            `);

        }

        document.getElementById('demoJSON').innerHTML = table.join('');
    }
function toilNum() {
    let rows = document.getElementsByTagName('tr');
    document.getElementById('toilCount').innerHTML = '총 ' + (rows.length-1) + '개';
}

window.onload = function() {
    toilNum();
    setInterval(toilNum, 1000);
}

    function removeTable() {
        document.getElementById('demoJSON').innerHTML = '';
    }
    function handleSubmit(event) {
        event.preventDefault();
        loadToiletInfo();
        loadToiletInfoMAP()
    }




