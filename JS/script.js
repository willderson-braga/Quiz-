
    var quiztitle = "Teste os seus conhecimentos sobre a Covid-19";
	

    var quiz = [
        {
            "question"      :   "Q1: O que devo fazer quando for tossir? ",
            "image"         :   "Images/tosse.jpg",
            "choices"       :   [
                                    "Não prender a tosse e tossir encima dos outros",
                                    "Cobrir a boca com a mão",
                                    "Fazer o movimento com braço cobrindo a boca",
                                    "Bocejar"
                                ],
            "correct"       :   "Fazer o movimento com braço cobrindo a boca",
        },
        {
            "questão"       :  "Q2: Qual o periodo de incubação da Covid?",
            "image"         :   "Images/tempo.png",
            "choices"       :   [
                                    "14 dias",
                                    "20 dias",
                                    "45 dias",
                                    "1 mês"
                                ],
            "correct"       :   "14 dias",
        },
        {
            "questão"       :  "Q3: Os sintomas mais comuns da COVID-19 são ?",
			"image"         :   "Images/dorfebretosse.png",
            "choices"       :   [
                                    "Dor nos joelhos",
                                    "Febre, tosse seca e cansaço",
                                    "Dor de dente",
                                    "Pressão alta"
                                ],
            "correct"       :   "Febre, tosse seca e cansaço",
        },
         {
            "questão"       :  "Q4: O que é recomendado para lavar a mão com agua corrente contra o covid ?",
            "image"         :   "Images/lavarasmaos.jpg",
            "choices"       :   [
                                    "Sabão",
                                    "Perfume",
                                    "Óleo",
                                    "Naftalina"
                                ],
            "correct"       :   "Sabão",
        },
        {
            "questão"       :  "Q5: O que previne a infecção do coronavirus ? ",
			 "image"        :   "images/prevencao.jpg",
            "choices"       :   [
                                    "Fazer gargarejo com água morna, sal e vinagre",
                                    "Chá de erva-doce",
                                    "Bebidas alcolicas",
                                    "Nenhumas das respostas"
                                ],
            "correct"       :   "Nenhumas das respostas",
        },
        {
            "questão"       :  "Q6: A COVID-19 é mais perigosa para indivíduos ?",
            "image"         :   "images/idoso.jpg",
            "choices"       :   [
                                    "Adultos acima dos 60 anos",
                                    "Adolecentes",
                                    "Crianças",
                                    "Gravidas"
                                ],
            "correct"       :   "Adultos acima dos 60 anos",
        },
        {
            "questão"       :  "Q7: Segundo a Organização Mundial de Saúde, o período entre a entrada do novo coronavírus no corpo de uma pessoa e o início dos sintomas",
            "image"         :   "Images/calendario.jpg",
            "choices"       :   [
                                    "18 dias",
                                    "5 a 6 dias",
                                    "1 dia",
                                    " 10 dias"
                                ],
            "correct"       :   "5 a 6 dias",
        },
        {
            "questão"       :  "Q8: Ao usar a máscara é preciso cobrir a boca e o nariz e enquanto estiver usando, não devo tocar na máscara?",
			"image"         :   "Images/mascara.jpg",
            "choices"       :   [
                                    "FALSO",
                                    "TANTO FAZ",
                                    "VERDADEIRO",
                                    "NENHUMA DAS RESPOSTAS"
                                ],
            "correct"       :   "VERDADEIRO",
        },
        {
            "questão"       :  "Q9: Qual opção abaixo não corresponde ao sintoma comum da COVID-19?",
            "image"         :   "Images/manchas_vermelhas.jpg",
            "choices"       :   [
                                    "Mialgia e fadiga;",
                                    "Placa vermelhas no corpo",
                                    "Tosse",
                                    "Febre (>37,8ºC);"
                                ],
            "correct"       :   "Placa vermelhas no corpo",
        },
        {
            "questão"       :  "Q10: Ao sair de casa, devo utilizar........e........para higienizar as mãos regularmente?",
			"image"         :   "Images/mascaraealcoolgel.jpg",
            "choices"       :   [
                                    "Perfume e Colônia",
                                    "Bones e Óculos escuros",
                                    "Máscara e alcool gel",
                                    "Guarda-Chuva e Protetor Solar"
                                ],
            "correct"       :   "Máscara e alcool gel",
        },
    ];


    var question = 0, score = 0, submt=true, picked;

    jQuery(document).ready(function($){
        function htmlEncode(value){
          return $(document.createElement('div')).text(value).html();
        }
        function addChoices(choices){
            if(typeof choices !== "undefined" && $.type(choices) == "array"){
                $('#choice-block').empty();
                for(var i=0;i<choices.length; i++){
                    $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
                }
            }
        }

        function nextQuestion(){
            submt = true;
            $('#explanation').empty();
            $('#question').text(quiz[question]['questão']);
            $('#pager').text('Questão' + Number(question + 1) + ' de ' + quiz.length);
            if(quiz[question].hasOwnProperty('image') && quiz[question]['image'] != ""){
                if($('#question-image').length == 0){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[question]['image']).attr('alt', htmlEncode(quiz[question]['question'])).insertAfter('#question');
                } else {
                    $('#question-image').attr('src', quiz[question]['image']).attr('alt', htmlEncode(quiz[question]['questão']));
                }
            } else {
                $('#question-image').remove();
            }
            addChoices(quiz[question]['choices']);
            setupButtons();
        }

        function processQuestion(choice){
            if(quiz[question]['choices'][choice] == quiz[question]['correct']){
                $('.choice').eq(choice).css({'background-color':'#50D943'});
                $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[question]['explanation']));
                score++;
            } else {
                $('.choice').eq(choice).css({'background-color':'#D92623'});
                $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[question]['explanation']));
            }
            question++;
            $('#submitbutton').html('PRÓXIMA QUESTÃO &raquo;').on('click', function(){
                if(question == quiz.length){
                    endQuiz();
                } else {
                    $(this).text('Verifique a resposta').css({'color':'#937E90'}).off('click');
                    nextQuestion();
                }
            })
        }

        function setupButtons(){
            $('.choice').on('mouseover', function(){
                $(this).css({'background-color':'#e1e1e1'});
            });
            $('.choice').on('mouseout', function(){
                $(this).css({'background-color':'#fff'});
            })
            $('.choice').on('click', function(){
                picked = $(this).attr('data-index');
                $('.choice').removeAttr('style').off('mouseout mouseover');
                $(this).css({'border-color':'#222','font-weight':700,'background-color':'#c1c1c1'});
                if(submt){
                    submt=false;
                    $('#submitbutton').css({'color':''}).on('click', function(){
                        $('.choice').off('click');
                        $(this).off('click');
                        processQuestion(picked);
                    });
                }
            })
        }

        function endQuiz(){
            $('#explanation').empty();
            $('#question').empty();
            $('#choice-block').empty();
            $('#submitbutton').remove();
            $('#question').text("VOCÊ FEZ " + score + " ACERTOS DE " + quiz.length + " PERGUNTAS.");
            $(document.createElement('h2')).css({'text-align':'center', 'font-size':'4em'}).text(Math.round(score/quiz.length * 100) + '%').insertAfter('#question');
        }

        function init(){
            if(typeof quiztitle !== "undefined" && $.type(quiztitle) === "string"){
                $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
            } else {
                $(document.createElement('h1')).text("Quiz").appendTo('#frame');
            }

            if(typeof quiz !== "undefined" && $.type(quiz) === "array"){

                $(document.createElement('p')).addClass('pager').attr('id','pager').text('Questão 1 de ' + quiz.length).appendTo('#frame');

                $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
 
                if(quiz[0].hasOwnProperty('image') && quiz[0]['image'] != ""){
                    $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
                }
            
                $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');
            
                addChoices(quiz[0]['choices']);
            
                $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('VERIFIQUE').css({'font-weight':700,'color':'#222','padding':'30px 0'}).appendTo('#frame');
            
                setupButtons();
            }
        }
        
        init();
    });