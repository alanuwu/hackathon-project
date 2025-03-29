import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

def clasificar_imagen(ruta_imagen, ruta_modelo='modelo_maiz.h5'):
    """
    Carga un modelo entrenado y clasifica una imagen dada su ruta.

    Args:
        ruta_imagen (str): La ruta a la imagen que se va a clasificar.
        ruta_modelo (str, opcional): La ruta al archivo del modelo entrenado (.h5).
            Por defecto es 'modelo_maiz.h5'.

    Returns:
        str: La etiqueta de clase predicha para la imagen.
    """

    # Carga el modelo entrenado
    model = tf.keras.models.load_model(ruta_modelo)

    # Preprocesa la imagen
    img = image.load_img(ruta_imagen, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    # Realiza la predicción
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])

    # Mapea la clase predicha a la etiqueta
    class_labels = {0: 'Common Rust', 1: 'Gray Leaf Spot', 2: 'Blight', 3: 'Healthy'}
    predicted_label = class_labels[predicted_class]

    return predicted_label

# Ejemplo de uso
ruta_imagen = '/home/mrchippu/Documentos/data/validation/commonrusttest.jpg'  # Reemplaza con la ruta de tu imagen
etiqueta_predicha = clasificar_imagen(ruta_imagen)
print(f'La imagen se clasifica como: {etiqueta_predicha}')