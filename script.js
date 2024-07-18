document.getElementById('noticeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 입력된 제목과 내용을 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 새로운 알림 요소 생성
    const notice = document.createElement('div');
    notice.className = 'notice';
    
    const noticeTitle = document.createElement('h3');
    noticeTitle.textContent = title;
    
    const noticeContent = document.createElement('p');
    noticeContent.textContent = content;
    
    notice.appendChild(noticeTitle);
    notice.appendChild(noticeContent);

    // 알림을 알림판 영역에 추가
    document.getElementById('notices').appendChild(notice);

    // 입력 필드 초기화
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});
