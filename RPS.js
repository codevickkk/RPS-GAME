 // instead of these we use local storage
    /*const score = {
      win : 0,
      lose : 0,
      Tie : 0

    };*/

      //these also works

      
      let score = JSON.parse(localStorage.getItem('score')) || {
        win : 0,
        lose : 0,
        Tie : 0,
      };

      
      updateScoreElement();

      
      //instead of null we also use not operator
      // coz not score and null gives same meaning 
      // if(score === null) {
        
      // if(!score) {
        //   score = {
      //     win : 0,
      //     lose : 0,
      //     Tie : 0,
      //   }
      // }

      let isAutoplayRunning = false;
      let intervalId;

      //arrow fuunction
      // const autoplay() => { 
        
      // };
      //playgame
      
      function playGame(playMove) {
          const computerMove = pickComputerMove();
          
          let result = '';
          
          
          if (playMove === 'scissors') {
              if (computerMove === 'rock') {
                result = 'lose';
            } else if (computerMove === 'paper') {
              result = 'win';
            } else if (computerMove === 'scissors') {
              result = 'Tie';
            }
    
          } else if (playMove === 'paper') {
            if (computerMove === 'rock') {
                result = 'win';
              } else if (computerMove === 'paper') {
                result = 'Tie';
              } else if (computerMove === 'scissors') {
                result = 'lose';
              }
              
            } else if (playMove === 'rock') {
              if (computerMove === 'rock') {
                result = 'Tie';
              } else if (computerMove === 'paper') {
                result = 'lose';
              } else if (computerMove === 'scissors') {
                result = 'win';
              }
              
            }
            
            if(result === 'win'){
              score.win += 1;
            } else if (result === 'lose'){
              score.lose += 1;
            } else if (result === 'Tie') {
              score.Tie += 1;
            }
            
            
            
            localStorage.setItem('score',JSON.stringify(score));
    
            //display result
            document.querySelector('.js-result').innerHTML = `${result}`;
    
    
            //display moves
            document.querySelector('.js-moves').innerHTML = ` you 
        <img src="./images/${playMove}-emoji.png" class="icon" alt="">
        <img src="./images/${computerMove}-emoji.png" class="icon" alt="">
        computer`; 
            
              updateScoreElement();
              
    
      //         alert(`you picked ${playMove}.Computer picked ${computerMove}.${result} 
      // win: ${score.win},lose:${score.lose},Tie:${score.Tie}`);
    
          
    
          
        }
    
        function updateScoreElement () {
          document.querySelector('.js-score').innerHTML = `win: ${score.win},lose:${score.lose},Tie:${score.Tie}`
    
        }
    
        
    
        function pickComputerMove() {
          const randomNumber = Math.random();
    
            if (randomNumber >= 0 && randomNumber < 1/3) {
            computerMove = 'rock';
          } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
            computerMove = 'paper';
          } else if (randomNumber >= 2/3 && randomNumber < 1){ 
            computerMove = 'scissors';
          }
    
          return computerMove;
    
        }

      //resetscore event

      function resetScore() {
        score.win = 0;
        score.lose = 0;
        score.Tie = 0;
        localStorage.removeItem('score');
      }


      //auto play event

      function autoPlay() {
        if(!isAutoplayRunning){

         intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          },1000);
          isAutoplayRunning = true;
          
          document.querySelector('.js-btn-autoplay').innerHTML='stop playing';

        }else{
          clearInterval(intervalId);
          isAutoplayRunning = false;

          document.querySelector('.js-btn-autoplay').innerHTML = 'Auto play';
        }
        
      }

      
      
      //addeventlistner instead of onclick



      document.querySelector('.js-event-btn').addEventListener('click',() => {
        playGame('rock');
      });

      document.querySelector('.js-event-btn2').addEventListener('click',() => {
        playGame('paper');
      });

      document.querySelector('.js-event-btn3').addEventListener('click',() => {
        playGame('scissors');
      });

      document.querySelector('.js-event-reset').addEventListener('click',() => {
        if(displayPopUp()) {

          resetScore();
          updateScoreElement();
        }
     
      });

      document.querySelector('.js-btn-autoplay').addEventListener('click',() => {
        autoPlay();
      });


      //addeventlistner to the body -keydown

      document.body.addEventListener('keydown',(event) => {
        if (event.key === 'r') {
          playGame('rock');
        }else if(event.key === 'p') {
          playGame('paper');
        }else if(event.key === 's') {
          playGame('scissors');
        }else if(event.key === 'a'){
          autoPlay();
        }
      });
 
      document.body.addEventListener('keydown', (event) => {
         if(event.key === 'Backspace' && displayPopUp()){
          resetScore();
          updateScoreElement();
           
      } 
      
    });
    
  function displayPopUp(){
      document.querySelector('.js-display-popup').innerHTML = 
      `Are you sure you want to reset the score?
      <button class="js-display-yes js-reset-empty"> yes <button> 

      <button class="js-display-no js-reset-empty"> No <button>`

      document.querySelector('.js-display-yes').addEventListener('click',() => {
          resetScore();
          updateScoreElement();
          resetEmpty();
          
      });

      document.querySelector('.js-display-no').addEventListener('click',() => {
        resetEmpty();
      
      });

  }



  function resetEmpty () {
    document.querySelector('.js-display-popup').innerHTML = '';
  }

    