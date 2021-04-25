from server import app

if __name__ == "__main__":
    app.run(port=5000, debug=True)


def bro(a):
    a = 3
    a = 2
    sn = a + a
    b = 3
    b = b + a
    toto = 3
    return sn + b + toto
