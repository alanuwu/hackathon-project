import json
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter

# Cargar el archivo JSON
with open('message.json', 'r') as file:
    data = json.load(file)

# Extraer datos de temperatura y humedad de LoRa y NB-IoT
lora_temps = [float(sensor['temperature']) for sensor in data['LoRa_Sensors']]
lora_humids = [float(sensor['humidity']) for sensor in data['LoRa_Sensors']]
nb_temps = [float(sensor['temperature']) for sensor in data['NB_IoT_Sensors']]
nb_humids = [float(sensor['humidity']) for sensor in data['NB_IoT_Sensors']]

def interpretar_varianza(varianza):
    if varianza < 1:
        return "Baja"
    elif 1 <= varianza < 10:
        return "Moderada"
    else:
        return "Alta"

def interpretar_coef_variacion(cv):
    if cv < 10:
        return "Baja variabilidad"
    elif 10 <= cv < 20:
        return "Moderada variabilidad"
    else:
        return "Alta variabilidad"

def calcular_estadisticas(datos, nombre):
    media = float(np.mean(datos))
    mediana = float(np.median(datos))
    moda = float(Counter(datos).most_common(1)[0][0])
    varianza = float(np.var(datos))
    desviacion = float(np.std(datos))
    coef_variacion = float((desviacion / media) * 100 if media != 0 else 0)
    rango = float(np.max(datos) - np.min(datos))
    min_val = float(np.min(datos))
    max_val = float(np.max(datos))
    
    interpretacion_varianza = interpretar_varianza(varianza)
    interpretacion_cv = interpretar_coef_variacion(coef_variacion)
    
    print(f"--- Estadísticas de {nombre} ---")
    print(f"Media: {media:.2f}")
    print(f"Mediana: {mediana:.2f}")
    print(f"Moda: {moda:.2f}")
    print(f"Varianza: {varianza:.2f} ({interpretacion_varianza})")
    print(f"Desviación estándar: {desviacion:.2f}")
    print(f"Coeficiente de variación: {coef_variacion:.2f}% ({interpretacion_cv})")
    print(f"Rango: {rango:.2f}")
    print(f"Valor mínimo: {min_val:.2f}")
    print(f"Valor máximo: {max_val:.2f}\n")
    
    return {
        "media": media,
        "mediana": mediana,
        "moda": moda,
        "varianza": varianza,
        "interpretacion_varianza": interpretacion_varianza,
        "desviacion_estandar": desviacion,
        "coef_variacion": coef_variacion,
        "interpretacion_coef_variacion": interpretacion_cv,
        "rango": rango,
        "min": min_val,
        "max": max_val
    }

# Calcular estadísticas para temperatura y humedad
temp_stats_lora = calcular_estadisticas(lora_temps, "Temperatura (LoRa)")
humid_stats_lora = calcular_estadisticas(lora_humids, "Humedad (LoRa)")
temp_stats_nb = calcular_estadisticas(nb_temps, "Temperatura (NB-IoT)")
humid_stats_nb = calcular_estadisticas(nb_humids, "Humedad (NB-IoT)")

# Guardar estadísticas en un archivo JSON
estadisticas = {
    "Temperatura_LoRa": temp_stats_lora,
    "Humedad_LoRa": humid_stats_lora,
    "Temperatura_NB_IoT": temp_stats_nb,
    "Humedad_NB_IoT": humid_stats_nb
}

with open('estadisticas.json', 'w') as json_file:
    json.dump(estadisticas, json_file, indent=4)

# Graficar los datos
def graficar_histograma(datos, titulo, color):
    plt.hist(datos, bins=10, color=color, edgecolor='black', alpha=0.7)
    plt.xlabel(titulo)
    plt.ylabel("Frecuencia")
    plt.title(f"Distribución de {titulo}")
    plt.show()

graficar_histograma(lora_temps, "Temperatura (LoRa)", "blue")
graficar_histograma(lora_humids, "Humedad (LoRa)", "green")
graficar_histograma(nb_temps, "Temperatura (NB-IoT)", "red")
graficar_histograma(nb_humids, "Humedad (NB-IoT)", "purple")
