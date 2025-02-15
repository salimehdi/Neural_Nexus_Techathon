import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding, hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

def derive_key(password, salt):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
    )
    return kdf.derive(password.encode())

def aes_decrypt(ciphertext, password):
    data = base64.b64decode(ciphertext)
    salt, iv, actual_ciphertext = data[:16], data[16:32], data[32:]

    key = derive_key(password, salt)
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
    decryptor = cipher.decryptor()
    decrypted_padded = decryptor.update(actual_ciphertext) + decryptor.finalize()

    unpadder = padding.PKCS7(128).unpadder()
    decrypted = unpadder.update(decrypted_padded) + unpadder.finalize()

    return decrypted.decode()

if __name__ == "__main__":
    password = input("Enter decryption password: ")
    ciphertext = input("Enter encrypted text: ")
    try:
        decrypted = aes_decrypt(ciphertext, password)
        print(f"\nDecrypted Text:\n{decrypted}")
    except Exception as e:
        print("\nDecryption failed. Invalid password or corrupted data.")
