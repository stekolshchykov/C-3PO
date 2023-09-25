I'm developing an online translator app, and this is what I found out empirically:

sl - source language code (auto for autodetection)
tl - translation language
q - source text / word
ie - input encoding (a guess)
oe - output encoding (a guess)
dt - may be included more than once and specifies what to return in the reply.
Here are some values for dt. If the value is set, the following data will be returned:

t - translation of source text
at - alternate translations
rm - transcription / transliteration of source and translated texts
bd - dictionary, in case source text is one word (you get translations with articles, reverse translations, etc.)
md - definitions of source text, if it's one word
ss - synonyms of source text, if it's one word
ex - examples
rw - See also list.
dj - Json response with names. (dj=1)








---------------------------------------

say Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

tts speak "Текст, который хотите озвучить"