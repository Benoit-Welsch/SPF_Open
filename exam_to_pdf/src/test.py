import main

# q = main.Question("./ex/qti.xml")

html = main.QTI("./ex/BNG22097.zip").makeTemplate()

#open text file
text_file = open("./out/BNG22097.html", "w")
 
#write string to file
text_file.write(html)
 
#close file
text_file.close()
