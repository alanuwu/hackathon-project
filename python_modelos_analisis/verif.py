import tensorflow as tf

if tf.config.list_physical_devices('GPU'):
  print("TensorFlow está utilizando la GPU")
else:
  print("TensorFlow NO está utilizando la GPU")

print(tf.config.list_physical_devices('GPU'))