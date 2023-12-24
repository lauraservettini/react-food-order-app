# React Food Order App

Questo app è stata creata utilizzando Vite e React.

L'app carica i piatti disponibili alla vendita dal backend (in questo caso da un file JSON) e li visualizza nella schermata principale.
E' presente un carrello i cui dati sono accessibili in tutti i componenti.
Cliccando su "Cart(n.)" si aprirà un modal nel quale si avrà un riepilogo dei prodotti selezionati fino a quel momento.
Dal carrello è possibile, aumentare, diminuire o eliminare il singolo articolo, chiudere il modal per proseguire con gli acquisti oppure continuare al Checkout con l'inserimento dei dati cliente in un form (sempre nello stesso modal).

Se l'ordine avrà esito positivo verrà visualizzato nel modal un messaggio di conferma e verrà svuotato il carrello.

#LICENSE
[MIT License]('./MIT-LICENSE');