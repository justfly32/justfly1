document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 입력된 제목과 내용을 가져오기
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 새로운 글 요소 생성
    const post = document.createElement('div');
    post.className = 'post';
    
    const postTitle = document.createElement('h3');
    postTitle.textContent = title;
    
    const postContent = document.createElement('p');
    postContent.textContent = content;
    
    post.appendChild(postTitle);
    post.appendChild(postContent);

    // 글을 게시물 영역에 추가
    document.getElementById('posts').appendChild(post);

    // 입력 필드 초기화
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});
