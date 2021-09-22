class MENU{
    constructor(){
        this.b1=createButton("Start");
        this.radioMess = createElement('h2');
        this.radioMess2 = createElement('h2');
        this.radioMess3 = createElement('h2');
        this.radioMess4 = createElement('h');
        
    }
   
    hide(){
        this.b1.hide();
        this.radioMess.hide();
        this.radioMess2.hide();
        this.radioMess3.hide();
        this.radioMess4.hide();
      }

    display(){
        this.b1.position(600,300);

        
     this.b1.mousePressed(()=>{
     this.b1.hide();
     this.radioMess.html("It's 2111. A deadly virus has started to spread in the outskirts of a native town called Adendorp in Africa. This virus alters the")
     this.radioMess.position(10,0);
     this.radioMess2.html("mankind genes to turn them into Zombies. Good News: Humans have been preparing for these kind of things since long and so, they")
     this.radioMess2.position(10,30);
     this.radioMess3.html("have the perfect antitode of it called Vials. Bad News: A truck transporting 3 Vial tubes has been attacked by the zombies.")
     this.radioMess3.position(10,60);
     gameState=1;
     pc.visible=false

    })

}
}