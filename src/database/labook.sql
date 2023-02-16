-- Active: 1676049450909@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

INSERT INTO users(id, name, email, password, role)
VALUES
    ("u001", "Fulano", "fulano@email.com", "fu1234", "0"),
    ("u002", "Beltrano", "beltrano@email.com", "be4242", "0"),
    ("u003", "Ciclano", "ciclano@email.com", "ci7655", "0")      
;

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
    ("p001", "u001", "image", 2, 0),
    ("p002", "u001", "text", 0, 0),
    ("p003", "u003", "video", 10, 2)
;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p001", 2),
    ("u003", "p003", 10)
;