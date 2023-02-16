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
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()),
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,    
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

INSERT INTO users(id, name, email, password, role)
VALUES
    ("u001", "Fulano", "fulano@email.com", "fu1234", "NORMAL"),
    ("u002", "Beltrano", "beltrano@email.com", "be4242", "NORMAL"),
    ("u003", "Sicrano", "ciclano@email.com", "ci7655", "NORMAL"),
    ("u004", "Maria", "maria@email.com", "ma6785", "ADMIN")
;

INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u002", "image"),
    ("p002", "u002", "text"),
    ("p003", "u001", "video"),
    ("p004", "u003", "image")
;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p001", 1),
    ("u003", "p001", 1),
    ("u002", "p003", 1),
    ("u001", "p002", 1),
    ("u003", "p002", 1),
    ("u002", "p004", 1),
    ("u004", "p001", 0) 
;

----TOTAL L E D:
-- p001 = 2l, 1d / p002 = 2l / p003 = 1l / p004 = 1l

UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET dislikes = 1
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 1
WHERE id = "p003";

UPDATE posts
SET likes = 1
WHERE id = "p004";

