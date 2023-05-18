#Import Necessary Libraries
import speech_recognition as spr
from googletrans import Translator
from gtts import gTTS
import os

#Create Recognizer() class objects called recog1 and recog2
recog1 = spr.Recognizer()
recog2 = spr.Recognizer()

#Create microphone instance with device microphone chosen whose index value is 0
mc = spr.Microphone(device_index=0)

#Capture voice
with mc as source:
    print("Speak 'Hello' to initiate the Translation!")
    print("------------------------------------------")
    audio = recog1.listen(source)
try:
#Based on speech, tranlate the sentence into another language
    if 'hello' in recog1.recognize_google(audio):
        recog1 = spr.Recognizer()
        translator = Translator()
        from_lang = input("Enter your from language: ")
        to_lang = input("Enter your to language: ")
        with mc as source:
            print('Speak a sentence...')
            audio = recog2.listen(source)
            get_sentence = recog2.recognize_google(audio)
            get_sentence = recog2.recognize_google(audio)
            print('Phrase to be Tranlated: '+ get_sentence)
            try:
                text_to_translate = translator.translate(get_sentence, src = from_lang, dest = to_lang)
                text = text_to_translate.text
                speak = gTTS(text=text, lang = to_lang, slow = False)
                speak.save("translated_voice.mp3")
                os.system("start translated_voice.mp3")
            except spr.RequestError as e:
                print("Unable to provide required output".format(e))
except spr.UnknownValueError:
    print("Unable to understand the input")


import googletrans
print(googletrans.LANGUAGES)