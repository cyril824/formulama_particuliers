"""
Script pour générer un son de notification professionnelle
"""
import wave
import struct
import math

def generate_notification_sound(filename, duration=0.5):
    """
    Génère un son de notification composé de deux notes (Do et Mi) avec une enveloppe ADSR
    """
    sample_rate = 44100
    num_samples = int(sample_rate * duration)
    
    # Fréquences (notes Do et Mi)
    freq1 = 523.25  # Do5
    freq2 = 659.25  # Mi5
    
    # Paramètres ADSR (Attack, Decay, Sustain, Release)
    attack_time = 0.05
    decay_time = 0.15
    sustain_time = 0.15
    release_time = 0.15
    
    attack_samples = int(sample_rate * attack_time)
    decay_samples = int(sample_rate * decay_time)
    sustain_samples = int(sample_rate * sustain_time)
    release_samples = int(sample_rate * release_time)
    
    samples = []
    
    for i in range(num_samples):
        # Déterminer la phase ADSR
        if i < attack_samples:
            # Phase d'attaque: 0 à 1
            envelope = i / attack_samples
        elif i < attack_samples + decay_samples:
            # Phase de décroissance: 1 à 0.7
            envelope = 1.0 - (i - attack_samples) / decay_samples * 0.3
        elif i < attack_samples + decay_samples + sustain_samples:
            # Phase de sustain: 0.7
            envelope = 0.7
        elif i < attack_samples + decay_samples + sustain_samples + release_samples:
            # Phase de relâchement: 0.7 à 0
            envelope = 0.7 * (1.0 - (i - attack_samples - decay_samples - sustain_samples) / release_samples)
        else:
            envelope = 0
        
        # Calculer le temps
        t = i / sample_rate
        
        # Générer un son composite avec deux fréquences
        # Première note (Do) pour la première moitié du temps
        if i < num_samples * 0.6:
            sample = 0.5 * math.sin(2 * math.pi * freq1 * t) + 0.3 * math.sin(2 * math.pi * freq2 * t)
        else:
            # Deuxième note (Mi) pour la seconde moitié
            sample = 0.3 * math.sin(2 * math.pi * freq2 * t) + 0.2 * math.sin(2 * math.pi * freq1 * t)
        
        # Appliquer l'enveloppe ADSR
        sample = sample * envelope
        
        # Limiter pour éviter la distorsion
        sample = max(-1.0, min(1.0, sample))
        
        samples.append(sample)
    
    # Convertir en WAV d'abord
    wav_filename = filename.replace('.mp3', '.wav')
    
    with wave.open(wav_filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)   # 16-bit
        wav_file.setframerate(sample_rate)
        
        # Convertir les samples en bytes
        for sample in samples:
            value = int(sample * 32767)  # Convertir en 16-bit signed
            wav_file.writeframes(struct.pack('h', value))
    
    print(f"Fichier WAV créé: {wav_filename}")
    
    # Convertir WAV en MP3 si possible
    try:
        import subprocess
        result = subprocess.run([
            'ffmpeg', '-i', wav_filename, '-q:a', '9', '-y', filename
        ], capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"Fichier MP3 créé avec succès: {filename}")
            # Supprimer le fichier WAV temporaire
            import os
            os.remove(wav_filename)
        else:
            print(f"Avertissement: ffmpeg non trouvé ou erreur de conversion")
            print(f"Utilisation du fichier WAV à la place: {wav_filename}")
    except Exception as e:
        print(f"Avertissement: Impossible de convertir en MP3 ({e})")
        print(f"Utilisation du fichier WAV à la place: {wav_filename}")

if __name__ == '__main__':
    output_path = r'c:\Users\cyril\Documents\ENSITECH\PROJET MINI ENTREPRISE\formulama_vite\public\sounds\notification.mp3'
    generate_notification_sound(output_path, duration=0.6)
