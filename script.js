// Firebase 초기화
var firebaseConfig = {
    apiKey: "AIzaSyDYqB1qnIN3KuqkoYU9TyHQG2pfWKzWr_w",
    authDomain: "myweb-547bc.firebaseapp.com",
    databaseURL: "https://myweb-547bc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myweb-547bc",
    storageBucket: "myweb-547bc.appspot.com",
    messagingSenderId: "751450593114",
    appId: "1:751450593114:web:c67929288161dbfd3f8563",
    measurementId: "G-EFRG9SQ3ZC"
};
firebase.initializeApp(firebaseConfig);

// Firebase 익명 로그인
firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error('Authentication error:', errorCode, errorMessage);
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('User signed in:', user);
        // 데이터베이스 참조
        var db = firebase.database().ref('posts');

        // 폼 제출 이벤트 처리
        document.getElementById('postForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var title = document.getElementById('title').value;
            var content = document.getElementById('content').value;
            var newPostRef = db.push();
            newPostRef.set({
                title: title,
                content: content
            }).then(function() {
                console.log('글이 성공적으로 저장되었습니다.');
                document.getElementById('postForm').reset();
                showNotification();
            }).catch(function(error) {
                console.error('글 저장 실패:', error);
            });
        });

        // 글 저장 성공 알림
        function showNotification() {
            var notification = document.getElementById('notification');
            notification.style.display = 'block';
            setTimeout(function() {
                notification.style.display = 'none';
            }, 2000);
        }

        // 데이터베이스에서 데이터 읽기
        db.on('child_added', function(snapshot) {
            var post = snapshot.val();
            var li = document.createElement('li');
            li.setAttribute('data-key', snapshot.key);

            var a = document.createElement('a');
            a.href = "#";
            a.textContent = post.title;
            a.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 동작 방지
                document.getElementById('postTitle').textContent = post.title;
                document.getElementById('postBody').textContent = post.content;
                document.getElementById('postContent').style.display = 'block';
            });

            var deleteButton = document.createElement('button');
            deleteButton.textContent = "삭제";
            deleteButton.addEventListener('click', function() {
                var key = li.getAttribute('data-key');
                db.child(key).remove();
            });

            li.appendChild(a);
            li.appendChild(deleteButton);
            document.getElementById('posts').appendChild(li);
        });

        // 데이터베이스에서 데이터 제거 시 화면에서 항목 제거
        db.on('child_removed', function(snapshot) {
            var key = snapshot.key;
            var li = document.querySelector('li[data-key="' + key + '"]');
            if (li) {
                li.remove();
            }
            // 게시물 내용 숨기기
            var postTitle = document.getElementById('postTitle').textContent;
            if (postTitle === snapshot.val().title) {
                document.getElementById('postContent').style.display = 'none';
            }
        });
    } else {
        console.log('User is signed out.');
    }
});
