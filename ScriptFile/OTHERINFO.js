function loadGyeonggiToiletInfo() {
    let allToilets = [];
    let page = 1;
    const pageSize = 100;
    let lastPage = 112;
    const apiKey = '6a0a22138dc8494db11b6a686a9dbdb1';
    const url = `https://openapi.gg.go.kr/Publtolt?KEY=${apiKey}&Type=json&pIndex=${page}&pSize=${pageSize}`;
    function fetchPage() {
        if (page > 56) return;


        fetch(url)
            .then(response => response.json())
            .then(data => {
                const toiletData = data.Publtolt[1].row;

                allToilets = allToilets.concat(toiletData); // 빈 배열 안에 새로운 정보를 계속 해서 저장함
                displayToiletTable(allToilets);

                if (toiletData.length < pageSize || document.getElementById('toilCount').innerHTML !== '총 0개') {
                    // 페이지가 총 1개당 100 페이지로 되어 있는데 만약 이 페이지 수가 100보다 작을 경우 마지막 페이지 임 => 마지막 페이지 정보까지 보고 멈춤
                    // 아니면 미리 만든 TOILCONT 에서 정보가 총 0개가 아닐 경우, 즉 하나라도 있는 경우 페이지를 넘기기 않게 함 => 출력 결과를 빠르게 하기 위함 BUT 첫 페이지만 내 놓으면 그게 무슨 소용이지
                    return; // 검색이 이미 끝났으면 더 이상 페이지를 넘기지 않음
                } else {
                    page++;
                    fetchPage();
                    console.log(page); // 어떤 페이지 정보를 가져오고 있는지 확인 하기 위한 과정
                }
            })
            .catch(error => {
                console.error('데이터 불러오기 오류:', error);
            });
    }

    function fetchPage2() {
        if (lastPage < 57) return;  // lastPage가 57보다 작은 경우 멈춤

        const url = `https://openapi.gg.go.kr/Publtolt?KEY=${apiKey}&Type=json&pIndex=${lastPage}&pSize=${pageSize}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const toiletData = data.Publtolt[1].row;

                allToilets = allToilets.concat(toiletData);
                displayToiletTable(allToilets);

                if (toiletData.length < pageSize || document.getElementById('toilCount').innerHTML !== '총 0개') {
                    return;
                } else {
                    lastPage--;
                    fetchPage2();
                    console.log(lastPage);
                }
            })
            .catch(error => {
                console.error('데이터 불러오기 오류:', error);
            });
    }


    fetchPage();
    fetchPage2();
}

function displayToiletTable(toilets) {
    const keyword = document.getElementById('row').value.trim();
    const table = [];

    table.push(`<tr><th>건물이름</th><th>위치</th><th>남성용-대변기수</th><th>여성용-대변기수</th><th>개방 여부</th><th>남녀공용화장실여부</th> <th>개방시간</th></tr>`);

    let matched = 0;

    for (const e of toilets) {
        const name = e.PBCTLT_PLC_NM || '';
        const addr = e.REFINE_ROADNM_ADDR || '';

        if (!keyword || name.includes(keyword) || addr.includes(keyword)) {
            matched++; // 정보가 새로 추가 될때마다 MECHED를 1씩 추가
            table.push(`
                <tr>
                    <td>${name}</td>
                    <td>${addr}</td>
                    <td>${e.MALE_WTRCLS_CNT}</td>
                    <td>${e.FEMALE_WTRCLS_CNT}</td>
                    <td>${e.PUBLFACLT_DIV_NM}</td>
                    <td>${e.MALE_FEMALE_CMNUSE_TOILET_YN}</td>
                    <td>${e.OPEN_TM_INFO}</td>
                </tr>
            `);
        }
    }



    document.getElementById('demoJSON').innerHTML = table.join('');
    updateToiletCount(matched);
}


function updateToiletCount(count) {
    document.getElementById('toilCount').innerHTML = '총 ' + count + '개';
}

function removeTable() {
    document.getElementById('demoJSON').innerHTML = '';  // 표 지우기
    document.getElementById('toilCount').innerHTML = ''; // 총 갯수 지우기
}


window.onload = function () {
    updateToiletCount(0);  // 화면 내에 있는 정보를 계속 가져오기
};

