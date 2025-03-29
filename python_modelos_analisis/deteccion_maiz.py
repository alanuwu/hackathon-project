import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

# 1. Preparación de los datos
# Directorio donde se encuentran las imágenes
data_dir = '/home/mrchippu/Documentos/data' #Reemplaza con tu ruta correcta

# Generador de imágenes para aumentar los datos y normalizarlos
datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 20% para validación
)

# Generadores para entrenamiento y validación
train_generator = datagen.flow_from_directory(
    data_dir,
    target_size=(150, 150),  # Redimensionar imágenes a 150x150
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = datagen.flow_from_directory(
    data_dir,
    target_size=(150, 150),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# 2. Construcción del modelo CNN
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(150, 150, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(4, activation='softmax')  # 4 clases
])

# 3. Compilación del modelo
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# 4. Entrenamiento del modelo
history = model.fit(
    train_generator,
    epochs=20,  # Ajusta el número de épocas según sea necesario
    validation_data=validation_generator
)

# 5. Evaluación del modelo
test_loss, test_acc = model.evaluate(validation_generator)
print(f'Precisión del modelo en el conjunto de validación: {test_acc}')

# 6. Visualización de resultados (opcional)
plt.plot(history.history['accuracy'], label='Precisión del entrenamiento')
plt.plot(history.history['val_accuracy'], label='Precisión de la validación')
plt.xlabel('Época')
plt.ylabel('Precisión')
plt.legend()
plt.show()

# 7. Guardar el modelo (opcional)
model.save('modelo_maiz.h5')