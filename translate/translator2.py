# pip install pipwin

# pipwin install pyaudio

# pip install SpeechRecognition

# pip install gtts

# pip install googletrans==4.0.0-rc1

# pip install playsound==1.2.2

# pip install pillow

# Import Necessary Libraries

import speech_recognition as spr
from googletrans import Translator
from gtts import gTTS
from playsound import playsound
from tkinter import *
from tkinter import ttk
from PIL import Image, ImageTk
import googletrans
import os

ls = []
lang_dict = {}
lang_dict = googletrans.LANGUAGES
lt = {v: k for k, v in lang_dict.items()}
for k in lt.keys():
    ls.append(k)

root = Tk()
root.geometry("1800x900")
root.configure(bg='#4d88ff')
root.title("Voice Translator")


def tab1():
    def tab2():
        def tab3(fr, to):
            try:
                def back2(f):
                    if f == 1:
                        l3.destroy()
                        b5.destroy()
                    else:
                        l4.destroy()
                        l5.destroy()
                        b4.destroy()
                    tab2()

                l2.destroy()
                l6.destroy()
                dp1.destroy()
                dp2.destroy()
                b2.destroy()
                b3.destroy()

                # Create Recognizer() class objects called recog1 and recog2
                recog1 = spr.Recognizer()

                # Create microphone instance with device microphone chosen whose index value is 0
                mc = spr.Microphone(device_index=0)

                # Capture voice
                translator = Translator()
                from_lang = lt[fr]
                to_lang = lt[to]
                with mc as source:
                    print('Speak a sentence...')
                    audio = recog1.listen(source)
                    get_sentence = recog1.recognize_google(audio)
                    print('Phrase to be Tranlated: ' + get_sentence)
                    l4 = Label(
                        root, text=f"Before Translation : {get_sentence}", font=("Times New Roman", 16, "bold"))
                    l4.pack(pady=25)
                    try:
                        text_to_translate = translator.translate(
                            get_sentence, src=from_lang, dest=to_lang)
                        text = text_to_translate.text
                        l5 = Label(
                            root, text=f"After Translation : {text}", font=("Times New Roman", 16, "bold"))
                        l5.pack(pady=25)
                        speak = gTTS(text=text, lang=to_lang, slow=False)
                        speak.save("voice.mp3")
                        playsound("voice.mp3")
                        os.remove("voice.mp3")
                    except spr.RequestError as e:
                        print("Unable to provide required output".format(e))


                    b4 = Button(root, text="Back",
                               font=("Times New Roman", 14, "bold"), command=lambda: back2(0))
                    b4.pack(pady=25)

            except:
                l3 = Label(root, text="Error!!! Try Again",
                           font="calibri 20 bold")
                l3.pack(pady=25)
                b5 = Button(root, text="Back", font="arial 12 bold",
                            command=lambda: back2(1))
                b5.pack(pady=25)

        def back1():
            l2.destroy()
            l6.destroy()
            dp1.destroy()
            dp2.destroy()
            b3.destroy()
            b2.destroy()
            tab1()

        l1.destroy()
        b1.destroy()
        p1.destroy()

        l2 = Label(root, text="Select Language", font=("Times New Roman", 30, "bold"))
        l2.pack(pady=25)

        dp1 = ttk.Combobox(root, value=ls, width=50)
        dp1.pack(pady=25)
        dp1.current(21)

        dp2 = ttk.Combobox(root, value=ls, width=50)
        dp2.pack(pady=25)
        dp2.current(37)

        l6 = Label(root, text="*Note : Speak immediately after pressing the button", font="calibri 16 italic",fg="red")
        l6.pack(pady=25)

        b2 = Button(root, text="Press and Speak", font=("Times New Roman", 16, "bold"),
                    command=lambda: tab3(dp1.get(), dp2.get()))
        b2.pack(pady=25)

        b3 = Button(root, text="Back", font=("Times New Roman", 14, "bold"), command=back1)
        b3.pack(pady=25)

    l1 = Label(root, text="Language Translator",
               font=("Times New Roman", 36, "bold"))
    l1.pack(pady=25, fill=X)

    img = Image.open("st.png")
    logo = img.resize((500, 500), Image.ANTIALIAS)
    logo = ImageTk.PhotoImage(logo)
    
    p1 = Label(image=logo)
    p1.image = logo
    p1.pack()

    b1 = Button(root, text="Start",
                font=("Times New Roman", 16, "bold"), command=tab2)
    b1.pack(pady=25)

tab1()
root.mainloop()