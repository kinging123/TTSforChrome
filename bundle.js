(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var franc = require('franc');
var $ = require('jquery');
var ee = require('event-emitter');
var CountryLanguage = require('country-language');

var emitter = ee({}), listener;




var counter = 0;


function Tts() {
    var thisTTS = this;
    this.rate = 1.2;
    this.playing = false;
    this.utterance = null;
    this.text = '';
    this.target = null;
    this.charIndex = 0;
    this.counter = 0 ;

    this.isPlaying= function () {
        return this.playing;
    };

    this.init = function (text,target) {
        this.text= text;
        if (target)
            this.target= target;
        var isoLang = franc(toBeSpoken,3);
        CountryLanguage.getLanguage(isoLang, function (err, data) {
            if(err) console.log(err);
            if(data)
            {
                var utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = thisTTS.rate;
                utterance.voice = window.speechSynthesis.getVoices().filter(function(item){
                    return item.lang.indexOf(data.iso639_1)!=-1
                })[0];
                utterance.onend=function () {
                    thisTTS.playing=false;
                    thisTTS.eject();

                };


                utterance.onboundary = function (e) {
                    emitter.emit('index',e.charIndex);
                };
                thisTTS.utterance = utterance;
            }
        });
    };

    this.inject = function (element) {
        //this.target.parent().append('<div class="tts">'+element+'</div>');
        //this.target.hide();
        var overlay = $('<div class="ttsoverlay"> ' + element+' </div>');
        overlay.appendTo(document.body)

    };
    this.eject = function () {
        $('.ttsoverlay').hide();
        this.counter = 0;
        //this.target.parent().hide('.tts');
        //this.target.show();
    };

    this.play = function () {
        if(thisTTS.utterance){
            window.speechSynthesis.speak(thisTTS.utterance);
            thisTTS.playing = true;
        }
        this.inject(this.markDOM(this.text));
    };
    this.stop = function () {
        this.eject();
        console.log(this);
        window.speechSynthesis.cancel();
        thisTTS.playing = false;
    };
    this.resume = function () {
        window.speechSynthesis.resume();
        thisTTS.playing = true;
    };
    this.pause = function () {
        window.speechSynthesis.pause();
        thisTTS.playing = false;
    };
    this.goFaster = function () {
        this.rate= this.rate+0.1;
        this.init(this.text);
    };
    this.goSlower = function () {
        this.rate= this.rate-0.1;
        this.init(this.text);
    };

    this.markDOM = function (selectedText) {

        var fullElText = this.target.text();
        var sIndex = fullElText.indexOf(selectedText);
        var eIndex = sIndex+selectedText.length;

        var split = selectedText.split(/[ ,]+/);
        var marked = "";
        for (var i = 0 ; i<split.length ; i++ ){
            marked += "<span class='w" +i+"'>"+split[i]+" </span>" ;
        }
        result = fullElText.slice(0,sIndex) + marked +
            fullElText.slice(eIndex);
        return marked;
    }
}

var player = new Tts() ;

$(document).ready(function () {


    emitter.on('index', listener = function (index) {
        console.log(index);
        $('.w'+player.counter)
            .css("background-color","#f7e50a")
            .css("text-decoration", "underline");
        //$('.w'+counter--).css("background-color","white");
        player.counter++;
    });



    $(document).click(function (event) {
        //window.speechSynthesis.cancel();

        if (window.getSelection) {
            toBeSpoken = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            toBeSpoken = document.selection.createRange().text;
        }
        var target = $(event.target);
        player.init(toBeSpoken, target);




    }).keypress(function (event) {
        //console.log(event)
        if (event.key === "S") {
            if (player.isPlaying()) {
                player.stop();
            } else {
                if (player.utterance) {
                    player.play();
                }
            }
        } else if (event.key === "D") {
            if (player.isPlaying()) {
                player.pause();
            } else {
                player.resume();
            }
        } else if (event.key === "+") {
            player.goFaster();
        } else if (event.key === "_") {
            player.goSlower();
        }
    });

});
},{"country-language":3,"event-emitter":19,"franc":20,"jquery":24}],2:[function(require,module,exports){
module.exports={
  "languageFamilies": [
    "Northwest Caucasian",
    "Afro-Asiatic",
    "Indo-European",
    "Niger–Congo",
    "Northeast Caucasian",
    "Aymaran",
    "Turkic",
    "Language isolate",
    "Creole",
    "Sino-Tibetan",
    "Austronesian",
    "Algonquian",
    "Constructed",
    "Uralic",
    "South Caucasian",
    "Tupian",
    "Eskimo–Aleut",
    "Japonic",
    "Dravidian",
    "Nilo-Saharan",
    "Austroasiatic",
    "Koreanic",
    "Tai–Kadai",
    "Mongolic",
    "Dené–Yeniseian",
    "Niger-Congo",
    "Quechuan"
  ],
  "languages": [
    {
      "iso639_1": "ab",
      "iso639_2": "abk",
      "iso639_2en": "abk",
      "iso639_3": "abk",
      "name": [
        "Abkhaz"
      ],
      "nativeName": [
        "аҧсуа бызшәа",
        "аҧсшәа"
      ],
      "direction": "LTR",
      "family": "Northwest Caucasian"
    },
    {
      "iso639_1": "aa",
      "iso639_2": "aar",
      "iso639_2en": "aar",
      "iso639_3": "aar",
      "name": [
        "Afar"
      ],
      "nativeName": [
        "Afaraf"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "DJI"
      ]
    },
    {
      "iso639_1": "af",
      "iso639_2": "afr",
      "iso639_2en": "afr",
      "iso639_3": "afr",
      "name": [
        "Afrikaans"
      ],
      "nativeName": [
        "Afrikaans"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ZAF"
      ],
      "langCultureMs": [
        {
          "langCultureName": "af-ZA",
          "displayName": "Afrikaans - South Africa",
          "cultureCode": "0x0436"
        }
      ]
    },
    {
      "iso639_1": "ak",
      "iso639_2": "aka",
      "iso639_2en": "aka",
      "iso639_3": "aka",
      "name": [
        "Akan"
      ],
      "nativeName": [
        "Akan"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "GHA"
      ]
    },
    {
      "iso639_1": "sq",
      "iso639_2": "sqi",
      "iso639_2en": "alb",
      "iso639_3": "sqi",
      "name": [
        "Albanian"
      ],
      "nativeName": [
        "gjuha shqipe"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ALB"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sq-AL",
          "displayName": "Albanian - Albania",
          "cultureCode": "0x041C"
        }
      ]
    },
    {
      "iso639_1": "am",
      "iso639_2": "amh",
      "iso639_2en": "amh",
      "iso639_3": "amh",
      "name": [
        "Amharic"
      ],
      "nativeName": [
        "አማርኛ"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "ETH"
      ]
    },
    {
      "iso639_1": "ar",
      "iso639_2": "ara",
      "iso639_2en": "ara",
      "iso639_3": "ara",
      "name": [
        "Arabic"
      ],
      "nativeName": [
        "العربية"
      ],
      "direction": "RTL",
      "family": "Afro-Asiatic",
      "countries": [
        "DZA",
        "BHR",
        "TCD",
        "COM",
        "DJI",
        "EGY",
        "ERI",
        "IRQ",
        "ISR",
        "JOR",
        "KWT",
        "LBN",
        "LBY",
        "MRT",
        "MAR",
        "NER",
        "OMN",
        "QAT",
        "SAU",
        "SOM",
        "SDN",
        "SYR",
        "TUN",
        "ARE",
        "YEM"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-DZ",
          "displayName": "Arabic - Algeria",
          "cultureCode": "0x1401"
        },
        {
          "langCultureName": "ar-BH",
          "displayName": "Arabic - Bahrain",
          "cultureCode": "0x3C01"
        },
        {
          "langCultureName": "ar-EG",
          "displayName": "Arabic - Egypt",
          "cultureCode": "0x0C01"
        },
        {
          "langCultureName": "ar-IQ",
          "displayName": "Arabic - Iraq",
          "cultureCode": "0x0801"
        },
        {
          "langCultureName": "ar-JO",
          "displayName": "Arabic - Jordan",
          "cultureCode": "0x2C01"
        },
        {
          "langCultureName": "ar-KW",
          "displayName": "Arabic - Kuwait",
          "cultureCode": "0x3401"
        },
        {
          "langCultureName": "ar-LB",
          "displayName": "Arabic - Lebanon",
          "cultureCode": "0x3001"
        },
        {
          "langCultureName": "ar-LY",
          "displayName": "Arabic - Libya",
          "cultureCode": "0x1001"
        },
        {
          "langCultureName": "ar-MA",
          "displayName": "Arabic - Morocco",
          "cultureCode": "0x1801"
        },
        {
          "langCultureName": "ar-OM",
          "displayName": "Arabic - Oman",
          "cultureCode": "0x2001"
        },
        {
          "langCultureName": "ar-QA",
          "displayName": "Arabic - Qatar",
          "cultureCode": "0x4001"
        },
        {
          "langCultureName": "ar-SA",
          "displayName": "Arabic - Saudi Arabia",
          "cultureCode": "0x0401"
        },
        {
          "langCultureName": "ar-SY",
          "displayName": "Arabic - Syria",
          "cultureCode": "0x2801"
        },
        {
          "langCultureName": "ar-TN",
          "displayName": "Arabic - Tunisia",
          "cultureCode": "0x1C01"
        },
        {
          "langCultureName": "ar-AE",
          "displayName": "Arabic - United Arab Emirates",
          "cultureCode": "0x3801"
        },
        {
          "langCultureName": "ar-YE",
          "displayName": "Arabic - Yemen",
          "cultureCode": "0x2401"
        }
      ]
    },
    {
      "iso639_1": "an",
      "iso639_2": "arg",
      "iso639_2en": "arg",
      "iso639_3": "arg",
      "name": [
        "Aragonese"
      ],
      "nativeName": [
        "aragonés"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "hy",
      "iso639_2": "hye",
      "iso639_2en": "arm",
      "iso639_3": "hye",
      "name": [
        "Armenian"
      ],
      "nativeName": [
        "Հայերեն"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ARM"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hy-AM",
          "displayName": "Armenian - Armenia",
          "cultureCode": "0x042B"
        }
      ]
    },
    {
      "iso639_1": "as",
      "iso639_2": "asm",
      "iso639_2en": "asm",
      "iso639_3": "asm",
      "name": [
        "Assamese"
      ],
      "nativeName": [
        "অসমীয়া"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "av",
      "iso639_2": "ava",
      "iso639_2en": "ava",
      "iso639_3": "ava",
      "name": [
        "Avaric"
      ],
      "nativeName": [
        "авар мацӀ",
        "магӀарул мацӀ"
      ],
      "direction": "LTR",
      "family": "Northeast Caucasian"
    },
    {
      "iso639_1": "ae",
      "iso639_2": "ave",
      "iso639_2en": "ave",
      "iso639_3": "ave",
      "name": [
        "Avestan"
      ],
      "nativeName": [
        "avesta"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "ay",
      "iso639_2": "aym",
      "iso639_2en": "aym",
      "iso639_3": "aym",
      "name": [
        "Aymara"
      ],
      "nativeName": [
        "aymar aru"
      ],
      "direction": "LTR",
      "family": "Aymaran",
      "countries": [
        "BOL",
        "PER"
      ]
    },
    {
      "iso639_1": "az",
      "iso639_2": "aze",
      "iso639_2en": "aze",
      "iso639_3": "aze",
      "name": [
        "Azerbaijani"
      ],
      "nativeName": [
        "azərbaycan dili"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "AZE"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-az-AZ",
          "displayName": "Azeri (Cyrillic) - Azerbaijan",
          "cultureCode": "0x082C"
        },
        {
          "langCultureName": "Lt-az-AZ",
          "displayName": "Azeri (Latin) - Azerbaijan",
          "cultureCode": "0x042C"
        }
      ]
    },
    {
      "iso639_1": "bm",
      "iso639_2": "bam",
      "iso639_2en": "bam",
      "iso639_3": "bam",
      "name": [
        "Bambara"
      ],
      "nativeName": [
        "bamanankan"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "MLI"
      ]
    },
    {
      "iso639_1": "ba",
      "iso639_2": "bak",
      "iso639_2en": "bak",
      "iso639_3": "bak",
      "name": [
        "Bashkir"
      ],
      "nativeName": [
        "башҡорт теле"
      ],
      "direction": "LTR",
      "family": "Turkic"
    },
    {
      "iso639_1": "eu",
      "iso639_2": "eus",
      "iso639_2en": "baq",
      "iso639_3": "eus",
      "name": [
        "Basque"
      ],
      "nativeName": [
        "euskara",
        "euskera"
      ],
      "direction": "LTR",
      "family": "Language isolate",
      "langCultureMs": [
        {
          "langCultureName": "eu-ES",
          "displayName": "Basque - Basque",
          "cultureCode": "0x042D"
        }
      ]
    },
    {
      "iso639_1": "be",
      "iso639_2": "bel",
      "iso639_2en": "bel",
      "iso639_3": "bel",
      "name": [
        "Belarusian"
      ],
      "nativeName": [
        "беларуская мова"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BLR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "be-BY",
          "displayName": "Belarusian - Belarus",
          "cultureCode": "0x0423"
        }
      ]
    },
    {
      "iso639_1": "bn",
      "iso639_2": "ben",
      "iso639_2en": "ben",
      "iso639_3": "ben",
      "name": [
        "Bengali",
        "Bangla"
      ],
      "nativeName": [
        "বাংলা"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BGD",
        "IND"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "ber",
      "iso639_2en": "ber",
      "iso639_3": "ber",
      "name": [
        "Berber"
      ],
      "nativeName": [
        "Tamaziɣt",
        "Tamazight",
        "ⵜⴰⵎⴰⵣⵉⵖⵜ"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "DZA",
        "MAR"
      ]
    },
    {
      "iso639_1": "bh",
      "iso639_2": "bih",
      "iso639_2en": "bih",
      "iso639_3": "",
      "name": [
        "Bihari"
      ],
      "nativeName": [
        "भोजपुरी"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "bi",
      "iso639_2": "bis",
      "iso639_2en": "bis",
      "iso639_3": "bis",
      "name": [
        "Bislama"
      ],
      "nativeName": [
        "Bislama"
      ],
      "direction": "LTR",
      "family": "Creole",
      "countries": [
        "VUT"
      ]
    },
    {
      "iso639_1": "bs",
      "iso639_2": "bos",
      "iso639_2en": "bos",
      "iso639_3": "bos",
      "name": [
        "Bosnian"
      ],
      "nativeName": [
        "bosanski jezik"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BIH"
      ]
    },
    {
      "iso639_1": "br",
      "iso639_2": "bre",
      "iso639_2en": "bre",
      "iso639_3": "bre",
      "name": [
        "Breton"
      ],
      "nativeName": [
        "brezhoneg"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "bg",
      "iso639_2": "bul",
      "iso639_2en": "bul",
      "iso639_3": "bul",
      "name": [
        "Bulgarian"
      ],
      "nativeName": [
        "български език"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BGR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "bg-BG",
          "displayName": "Bulgarian - Bulgaria",
          "cultureCode": "0x0402"
        }
      ]
    },
    {
      "iso639_1": "my",
      "iso639_2": "mya",
      "iso639_2en": "bur",
      "iso639_3": "mya",
      "name": [
        "Burmese"
      ],
      "nativeName": [
        "ဗမာစာ"
      ],
      "direction": "LTR",
      "family": "Sino-Tibetan",
      "countries": [
        "MMR"
      ]
    },
    {
      "iso639_1": "ca",
      "iso639_2": "cat",
      "iso639_2en": "cat",
      "iso639_3": "cat",
      "name": [
        "Catalan",
        "Valencian"
      ],
      "nativeName": [
        "català",
        "valencià"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "AND"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ca-ES",
          "displayName": "Catalan - Catalan",
          "cultureCode": "0x0403"
        }
      ]
    },
    {
      "iso639_1": "ch",
      "iso639_2": "cha",
      "iso639_2en": "cha",
      "iso639_3": "cha",
      "name": [
        "Chamorro"
      ],
      "nativeName": [
        "Chamoru"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "ce",
      "iso639_2": "che",
      "iso639_2en": "che",
      "iso639_3": "che",
      "name": [
        "Chechen"
      ],
      "nativeName": [
        "нохчийн мотт"
      ],
      "direction": "LTR",
      "family": "Northeast Caucasian"
    },
    {
      "iso639_1": "ny",
      "iso639_2": "nya",
      "iso639_2en": "nya",
      "iso639_3": "nya",
      "name": [
        "Chichewa",
        "Chewa",
        "Nyanja"
      ],
      "nativeName": [
        "chiCheŵa",
        "chinyanja"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "MWI"
      ]
    },
    {
      "iso639_1": "zh",
      "iso639_2": "zho",
      "iso639_2en": "chi",
      "iso639_3": "zho",
      "name": [
        "Chinese"
      ],
      "nativeName": [
        "中文 (Zhōngwén)",
        "汉语",
        "漢語"
      ],
      "direction": "LTR",
      "family": "Sino-Tibetan",
      "countries": [
        "HKG",
        "MAC",
        "CHN",
        "TWN",
        "SGP"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-CN",
          "displayName": "Chinese - China",
          "cultureCode": "0x0804"
        },
        {
          "langCultureName": "zh-HK",
          "displayName": "Chinese - Hong Kong SAR",
          "cultureCode": "0x0C04"
        },
        {
          "langCultureName": "zh-MO",
          "displayName": "Chinese - Macau SAR",
          "cultureCode": "0x1404"
        },
        {
          "langCultureName": "zh-SG",
          "displayName": "Chinese - Singapore",
          "cultureCode": "0x1004"
        },
        {
          "langCultureName": "zh-TW",
          "displayName": "Chinese - Taiwan",
          "cultureCode": "0x0404"
        },
        {
          "langCultureName": "zh-CHS",
          "displayName": "Chinese (Simplified)",
          "cultureCode": "0x0004"
        },
        {
          "langCultureName": "zh-CHT",
          "displayName": "Chinese (Traditional)",
          "cultureCode": "0x7C04"
        }
      ]
    },
    {
      "iso639_1": "cv",
      "iso639_2": "chv",
      "iso639_2en": "chv",
      "iso639_3": "chv",
      "name": [
        "Chuvash"
      ],
      "nativeName": [
        "чӑваш чӗлхи"
      ],
      "direction": "LTR",
      "family": "Turkic"
    },
    {
      "iso639_1": "kw",
      "iso639_2": "cor",
      "iso639_2en": "cor",
      "iso639_3": "cor",
      "name": [
        "Cornish"
      ],
      "nativeName": [
        "Kernewek"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "co",
      "iso639_2": "cos",
      "iso639_2en": "cos",
      "iso639_3": "cos",
      "name": [
        "Corsican"
      ],
      "nativeName": [
        "corsu",
        "lingua corsa"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "cr",
      "iso639_2": "cre",
      "iso639_2en": "cre",
      "iso639_3": "cre",
      "name": [
        "Cree"
      ],
      "nativeName": [
        "ᓀᐦᐃᔭᐍᐏᐣ"
      ],
      "direction": "LTR",
      "family": "Algonquian"
    },
    {
      "iso639_1": "hr",
      "iso639_2": "hrv",
      "iso639_2en": "hrv",
      "iso639_3": "hrv",
      "name": [
        "Croatian"
      ],
      "nativeName": [
        "hrvatski jezik"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "HRV",
        "BIH"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hr-HR",
          "displayName": "Croatian - Croatia",
          "cultureCode": "0x041A"
        }
      ]
    },
    {
      "iso639_1": "cs",
      "iso639_2": "ces",
      "iso639_2en": "cze",
      "iso639_3": "ces",
      "name": [
        "Czech"
      ],
      "nativeName": [
        "čeština",
        "český jazyk"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "CZE",
        "SVK"
      ],
      "langCultureMs": [
        {
          "langCultureName": "cs-CZ",
          "displayName": "Czech - Czech Republic",
          "cultureCode": "0x0405"
        }
      ]
    },
    {
      "iso639_1": "da",
      "iso639_2": "dan",
      "iso639_2en": "dan",
      "iso639_3": "dan",
      "name": [
        "Danish"
      ],
      "nativeName": [
        "dansk"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "DNK",
        "FRO"
      ],
      "langCultureMs": [
        {
          "langCultureName": "da-DK",
          "displayName": "Danish - Denmark",
          "cultureCode": "0x0406"
        }
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "",
      "iso639_2en": "",
      "iso639_3": "prs",
      "name": [
        "Dari"
      ],
      "nativeName": [
        "فارسی دری"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "AFG"
      ]
    },
    {
      "iso639_1": "dv",
      "iso639_2": "div",
      "iso639_2en": "div",
      "iso639_3": "div",
      "name": [
        "Divehi",
        "Dhivehi",
        "Maldivian"
      ],
      "nativeName": [
        "ދިވެހި"
      ],
      "direction": "RTL",
      "family": "Indo-European",
      "countries": [
        "MDV"
      ],
      "langCultureMs": [
        {
          "langCultureName": "div-MV",
          "displayName": "Dhivehi - Maldives",
          "cultureCode": "0x0465"
        }
      ]
    },
    {
      "iso639_1": "nl",
      "iso639_2": "nld",
      "iso639_2en": "dut",
      "iso639_3": "nld",
      "name": [
        "Dutch"
      ],
      "nativeName": [
        "Nederlands",
        "Vlaams"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BEL",
        "NLD",
        "ABW",
        "CUW",
        "SXM",
        "SUR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nl-BE",
          "displayName": "Dutch - Belgium",
          "cultureCode": "0x0813"
        },
        {
          "langCultureName": "nl-NL",
          "displayName": "Dutch - The Netherlands",
          "cultureCode": "0x0413"
        }
      ]
    },
    {
      "iso639_1": "dz",
      "iso639_2": "dzo",
      "iso639_2en": "dzo",
      "iso639_3": "dzo",
      "name": [
        "Dzongkha"
      ],
      "nativeName": [
        "རྫོང་ཁ"
      ],
      "direction": "LTR",
      "family": "Sino-Tibetan",
      "countries": [
        "BTN"
      ]
    },
    {
      "iso639_1": "en",
      "iso639_2": "eng",
      "iso639_2en": "eng",
      "iso639_3": "eng",
      "name": [
        "English"
      ],
      "nativeName": [
        "English"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ATG",
        "AUS",
        "BHS",
        "BRB",
        "BLZ",
        "BWA",
        "CMR",
        "CAN",
        "CUW",
        "DMA",
        "ERI",
        "FJI",
        "GMB",
        "GHA",
        "GRD",
        "GUY",
        "HKG",
        "IND",
        "IRL",
        "JAM",
        "KEN",
        "KIR",
        "LSO",
        "LBR",
        "MWI",
        "MYS",
        "MLT",
        "MHL",
        "MUS",
        "FSM",
        "NAM",
        "NRU",
        "NZL",
        "NGA",
        "PAK",
        "PLW",
        "PNG",
        "PHL",
        "RWA",
        "KNA",
        "LCA",
        "VCT",
        "WSM",
        "SYC",
        "SLE",
        "SGP",
        "SXM",
        "SLB",
        "ZAF",
        "SSD",
        "LKA",
        "SDN",
        "SWZ",
        "TZA",
        "TON",
        "TTO",
        "TUV",
        "UGA",
        "GBR",
        "USA",
        "VUT",
        "ZMB",
        "ZWE"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-AU",
          "displayName": "English - Australia",
          "cultureCode": "0x0C09"
        },
        {
          "langCultureName": "en-BZ",
          "displayName": "English - Belize",
          "cultureCode": "0x2809"
        },
        {
          "langCultureName": "en-CA",
          "displayName": "English - Canada",
          "cultureCode": "0x1009"
        },
        {
          "langCultureName": "en-CB",
          "displayName": "English - Caribbean",
          "cultureCode": "0x2409"
        },
        {
          "langCultureName": "en-IE",
          "displayName": "English - Ireland",
          "cultureCode": "0x1809"
        },
        {
          "langCultureName": "en-JM",
          "displayName": "English - Jamaica",
          "cultureCode": "0x2009"
        },
        {
          "langCultureName": "en-NZ",
          "displayName": "English - New Zealand",
          "cultureCode": "0x1409"
        },
        {
          "langCultureName": "en-PH",
          "displayName": "English - Philippines",
          "cultureCode": "0x3409"
        },
        {
          "langCultureName": "en-ZA",
          "displayName": "English - South Africa",
          "cultureCode": "0x1C09"
        },
        {
          "langCultureName": "en-TT",
          "displayName": "English - Trinidad and Tobago",
          "cultureCode": "0x2C09"
        },
        {
          "langCultureName": "en-GB",
          "displayName": "English - United Kingdom",
          "cultureCode": "0x0809"
        },
        {
          "langCultureName": "en-US",
          "displayName": "English - United States",
          "cultureCode": "0x0409"
        },
        {
          "langCultureName": "en-ZW",
          "displayName": "English - Zimbabwe",
          "cultureCode": "0x3009"
        }
      ]
    },
    {
      "iso639_1": "eo",
      "iso639_2": "epo",
      "iso639_2en": "epo",
      "iso639_3": "epo",
      "name": [
        "Esperanto"
      ],
      "nativeName": [
        "Esperanto"
      ],
      "direction": "LTR",
      "family": "Constructed"
    },
    {
      "iso639_1": "et",
      "iso639_2": "est",
      "iso639_2en": "est",
      "iso639_3": "est",
      "name": [
        "Estonian"
      ],
      "nativeName": [
        "eesti",
        "eesti keel"
      ],
      "direction": "LTR",
      "family": "Uralic",
      "countries": [
        "EST"
      ],
      "langCultureMs": [
        {
          "langCultureName": "et-EE",
          "displayName": "Estonian - Estonia",
          "cultureCode": "0x0425"
        }
      ]
    },
    {
      "iso639_1": "ee",
      "iso639_2": "ewe",
      "iso639_2en": "ewe",
      "iso639_3": "ewe",
      "name": [
        "Ewe"
      ],
      "nativeName": [
        "Eʋegbe"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "GHA",
        "TGO"
      ]
    },
    {
      "iso639_1": "fo",
      "iso639_2": "fao",
      "iso639_2en": "fao",
      "iso639_3": "fao",
      "name": [
        "Faroese"
      ],
      "nativeName": [
        "føroyskt"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "langCultureMs": [
        {
          "langCultureName": "fo-FO",
          "displayName": "Faroese - Faroe Islands",
          "cultureCode": "0x0438"
        }
      ]
    },
    {
      "iso639_1": "fj",
      "iso639_2": "fij",
      "iso639_2en": "fij",
      "iso639_3": "fij",
      "name": [
        "Fijian"
      ],
      "nativeName": [
        "vosa Vakaviti"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "FJI"
      ]
    },
    {
      "iso639_1": "fi",
      "iso639_2": "fin",
      "iso639_2en": "fin",
      "iso639_3": "fin",
      "name": [
        "Finnish"
      ],
      "nativeName": [
        "suomi",
        "suomen kieli"
      ],
      "direction": "LTR",
      "family": "Uralic",
      "countries": [
        "FIN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fi-FI",
          "displayName": "Finnish - Finland",
          "cultureCode": "0x040B"
        }
      ]
    },
    {
      "iso639_1": "fr",
      "iso639_2": "fra",
      "iso639_2en": "fre",
      "iso639_3": "fra",
      "name": [
        "French"
      ],
      "nativeName": [
        "français",
        "langue française"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "BEL",
        "BEN",
        "BFA",
        "BDI",
        "CMR",
        "CAN",
        "CAF",
        "TCD",
        "COM",
        "CIV",
        "COD",
        "COG",
        "DJI",
        "GNQ",
        "FRA",
        "GUF",
        "PYF",
        "GLP",
        "MTQ",
        "MYT",
        "NCL",
        "REU",
        "BLM",
        "SPM",
        "WLF",
        "GAB",
        "GIN",
        "HTI",
        "ITA",
        "JEY",
        "LUX",
        "MDG",
        "MLI",
        "MUS",
        "MCO",
        "NER",
        "RWA",
        "SEN",
        "SYC",
        "CHE",
        "TGO",
        "VUT"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fr-BE",
          "displayName": "French - Belgium",
          "cultureCode": "0x080C"
        },
        {
          "langCultureName": "fr-CA",
          "displayName": "French - Canada",
          "cultureCode": "0x0C0C"
        },
        {
          "langCultureName": "fr-FR",
          "displayName": "French - France",
          "cultureCode": "0x040C"
        },
        {
          "langCultureName": "fr-LU",
          "displayName": "French - Luxembourg",
          "cultureCode": "0x140C"
        },
        {
          "langCultureName": "fr-MC",
          "displayName": "French - Monaco",
          "cultureCode": "0x180C"
        },
        {
          "langCultureName": "fr-CH",
          "displayName": "French - Switzerland",
          "cultureCode": "0x100C"
        }
      ]
    },
    {
      "iso639_1": "ff",
      "iso639_2": "ful",
      "iso639_2en": "ful",
      "iso639_3": "ful",
      "name": [
        "Fula",
        "Fulah",
        "Pulaar",
        "Pular"
      ],
      "nativeName": [
        "Fulfulde",
        "Pulaar",
        "Pular"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "BEN",
        "BFA",
        "MLI",
        "NER",
        "SEN"
      ]
    },
    {
      "iso639_1": "gl",
      "iso639_2": "glg",
      "iso639_2en": "glg",
      "iso639_3": "glg",
      "name": [
        "Galician"
      ],
      "nativeName": [
        "galego"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "langCultureMs": [
        {
          "langCultureName": "gl-ES",
          "displayName": "Galician - Galician",
          "cultureCode": "0x0456"
        }
      ]
    },
    {
      "iso639_1": "ka",
      "iso639_2": "kat",
      "iso639_2en": "geo",
      "iso639_3": "kat",
      "name": [
        "Georgian"
      ],
      "nativeName": [
        "ქართული"
      ],
      "direction": "LTR",
      "family": "South Caucasian",
      "countries": [
        "GEO"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ka-GE",
          "displayName": "Georgian - Georgia",
          "cultureCode": "0x0437"
        }
      ]
    },
    {
      "iso639_1": "de",
      "iso639_2": "deu",
      "iso639_2en": "ger",
      "iso639_3": "deu",
      "name": [
        "German"
      ],
      "nativeName": [
        "Deutsch"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "AUT",
        "BEL",
        "DEU",
        "LIE",
        "LUX",
        "ITA",
        "CHE"
      ],
      "langCultureMs": [
        {
          "langCultureName": "de-AT",
          "displayName": "German - Austria",
          "cultureCode": "0x0C07"
        },
        {
          "langCultureName": "de-DE",
          "displayName": "German - Germany",
          "cultureCode": "0x0407"
        },
        {
          "langCultureName": "de-LI",
          "displayName": "German - Liechtenstein",
          "cultureCode": "0x1407"
        },
        {
          "langCultureName": "de-LU",
          "displayName": "German - Luxembourg",
          "cultureCode": "0x1007"
        },
        {
          "langCultureName": "de-CH",
          "displayName": "German - Switzerland",
          "cultureCode": "0x0807"
        }
      ]
    },
    {
      "iso639_1": "el",
      "iso639_2": "ell",
      "iso639_2en": "gre",
      "iso639_3": "ell",
      "name": [
        "Greek"
      ],
      "nativeName": [
        "ελληνικά"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "GRC",
        "CYP"
      ],
      "langCultureMs": [
        {
          "langCultureName": "el-GR",
          "displayName": "Greek - Greece",
          "cultureCode": "0x0408"
        }
      ]
    },
    {
      "iso639_1": "gn",
      "iso639_2": "grn",
      "iso639_2en": "grn",
      "iso639_3": "grn",
      "name": [
        "Guaraní"
      ],
      "nativeName": [
        "Avañe'ẽ"
      ],
      "direction": "LTR",
      "family": "Tupian",
      "countries": [
        "PRY",
        "BOL"
      ]
    },
    {
      "iso639_1": "gu",
      "iso639_2": "guj",
      "iso639_2en": "guj",
      "iso639_3": "guj",
      "name": [
        "Gujarati"
      ],
      "nativeName": [
        "ગુજરાતી"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "IND"
      ],
      "langCultureMs": [
        {
          "langCultureName": "gu-IN",
          "displayName": "Gujarati - India",
          "cultureCode": "0x0447"
        }
      ]
    },
    {
      "iso639_1": "ht",
      "iso639_2": "hat",
      "iso639_2en": "hat",
      "iso639_3": "hat",
      "name": [
        "Haitian",
        "Haitian Creole"
      ],
      "nativeName": [
        "Kreyòl ayisyen"
      ],
      "direction": "LTR",
      "family": "Creole",
      "countries": [
        "HTI"
      ]
    },
    {
      "iso639_1": "ha",
      "iso639_2": "hau",
      "iso639_2en": "hau",
      "iso639_3": "hau",
      "name": [
        "Hausa"
      ],
      "nativeName": [
        "(Hausa) هَوُسَ"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "NER",
        "NGA"
      ]
    },
    {
      "iso639_1": "he",
      "iso639_2": "heb",
      "iso639_2en": "heb",
      "iso639_3": "heb",
      "name": [
        "Hebrew"
      ],
      "nativeName": [
        "עברית"
      ],
      "direction": "RTL",
      "family": "Afro-Asiatic",
      "countries": [
        "ISR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "he-IL",
          "displayName": "Hebrew - Israel",
          "cultureCode": "0x040D"
        }
      ]
    },
    {
      "iso639_1": "hz",
      "iso639_2": "her",
      "iso639_2en": "her",
      "iso639_3": "her",
      "name": [
        "Herero"
      ],
      "nativeName": [
        "Otjiherero"
      ],
      "direction": "LTR",
      "family": "Niger–Congo"
    },
    {
      "iso639_1": "hi",
      "iso639_2": "hin",
      "iso639_2en": "hin",
      "iso639_3": "hin",
      "name": [
        "Hindi"
      ],
      "nativeName": [
        "हिन्दी",
        "हिंदी"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "IND",
        "FJI"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hi-IN",
          "displayName": "Hindi - India",
          "cultureCode": "0x0439"
        }
      ]
    },
    {
      "iso639_1": "ho",
      "iso639_2": "hmo",
      "iso639_2en": "hmo",
      "iso639_3": "hmo",
      "name": [
        "Hiri Motu"
      ],
      "nativeName": [
        "Hiri Motu"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "PNG"
      ]
    },
    {
      "iso639_1": "hu",
      "iso639_2": "hun",
      "iso639_2en": "hun",
      "iso639_3": "hun",
      "name": [
        "Hungarian"
      ],
      "nativeName": [
        "magyar"
      ],
      "direction": "LTR",
      "family": "Uralic",
      "countries": [
        "HUN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hu-HU",
          "displayName": "Hungarian - Hungary",
          "cultureCode": "0x040E"
        }
      ]
    },
    {
      "iso639_1": "ia",
      "iso639_2": "ina",
      "iso639_2en": "ina",
      "iso639_3": "ina",
      "name": [
        "Interlingua"
      ],
      "nativeName": [
        "Interlingua"
      ],
      "direction": "LTR",
      "family": "Constructed"
    },
    {
      "iso639_1": "id",
      "iso639_2": "ind",
      "iso639_2en": "ind",
      "iso639_3": "ind",
      "name": [
        "Indonesian"
      ],
      "nativeName": [
        "Bahasa Indonesia"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "IDN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "id-ID",
          "displayName": "Indonesian - Indonesia",
          "cultureCode": "0x0421"
        }
      ]
    },
    {
      "iso639_1": "ie",
      "iso639_2": "ile",
      "iso639_2en": "ile",
      "iso639_3": "ile",
      "name": [
        "Interlingue"
      ],
      "nativeName": [
        "Interlingue"
      ],
      "direction": "LTR",
      "family": "Constructed"
    },
    {
      "iso639_1": "ga",
      "iso639_2": "gle",
      "iso639_2en": "gle",
      "iso639_3": "gle",
      "name": [
        "Irish"
      ],
      "nativeName": [
        "Gaeilge"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "IRL"
      ]
    },
    {
      "iso639_1": "ig",
      "iso639_2": "ibo",
      "iso639_2en": "ibo",
      "iso639_3": "ibo",
      "name": [
        "Igbo"
      ],
      "nativeName": [
        "Asụsụ Igbo"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "NGA"
      ]
    },
    {
      "iso639_1": "ik",
      "iso639_2": "ipk",
      "iso639_2en": "ipk",
      "iso639_3": "ipk",
      "name": [
        "Inupiaq"
      ],
      "nativeName": [
        "Iñupiaq",
        "Iñupiatun"
      ],
      "direction": "LTR",
      "family": "Eskimo–Aleut"
    },
    {
      "iso639_1": "io",
      "iso639_2": "ido",
      "iso639_2en": "ido",
      "iso639_3": "ido",
      "name": [
        "Ido"
      ],
      "nativeName": [
        "Ido"
      ],
      "direction": "LTR",
      "family": "Constructed"
    },
    {
      "iso639_1": "is",
      "iso639_2": "isl",
      "iso639_2en": "ice",
      "iso639_3": "isl",
      "name": [
        "Icelandic"
      ],
      "nativeName": [
        "Íslenska"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ISL"
      ],
      "langCultureMs": [
        {
          "langCultureName": "is-IS",
          "displayName": "Icelandic - Iceland",
          "cultureCode": "0x040F"
        }
      ]
    },
    {
      "iso639_1": "it",
      "iso639_2": "ita",
      "iso639_2en": "ita",
      "iso639_3": "ita",
      "name": [
        "Italian"
      ],
      "nativeName": [
        "italiano"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ITA",
        "HRV",
        "SMR",
        "SVN",
        "CHE",
        "VAT"
      ],
      "langCultureMs": [
        {
          "langCultureName": "it-IT",
          "displayName": "Italian - Italy",
          "cultureCode": "0x0410"
        },
        {
          "langCultureName": "it-CH",
          "displayName": "Italian - Switzerland",
          "cultureCode": "0x0810"
        }
      ]
    },
    {
      "iso639_1": "iu",
      "iso639_2": "iku",
      "iso639_2en": "iku",
      "iso639_3": "iku",
      "name": [
        "Inuktitut"
      ],
      "nativeName": [
        "ᐃᓄᒃᑎᑐᑦ"
      ],
      "direction": "LTR",
      "family": "Eskimo–Aleut"
    },
    {
      "iso639_1": "ja",
      "iso639_2": "jpn",
      "iso639_2en": "jpn",
      "iso639_3": "jpn",
      "name": [
        "Japanese"
      ],
      "nativeName": [
        "日本語 (にほんご)"
      ],
      "direction": "LTR",
      "family": "Japonic",
      "countries": [
        "JPN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ja-JP",
          "displayName": "Japanese - Japan",
          "cultureCode": "0x0411"
        }
      ]
    },
    {
      "iso639_1": "jv",
      "iso639_2": "jav",
      "iso639_2en": "jav",
      "iso639_3": "jav",
      "name": [
        "Javanese"
      ],
      "nativeName": [
        "basa Jawa"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "kl",
      "iso639_2": "kal",
      "iso639_2en": "kal",
      "iso639_3": "kal",
      "name": [
        "Kalaallisut",
        "Greenlandic"
      ],
      "nativeName": [
        "kalaallisut",
        "kalaallit oqaasii"
      ],
      "direction": "LTR",
      "family": "Eskimo–Aleut"
    },
    {
      "iso639_1": "kn",
      "iso639_2": "kan",
      "iso639_2en": "kan",
      "iso639_3": "kan",
      "name": [
        "Kannada"
      ],
      "nativeName": [
        "ಕನ್ನಡ"
      ],
      "direction": "LTR",
      "family": "Dravidian",
      "langCultureMs": [
        {
          "langCultureName": "kn-IN",
          "displayName": "Kannada - India",
          "cultureCode": "0x044B"
        }
      ]
    },
    {
      "iso639_1": "kr",
      "iso639_2": "kau",
      "iso639_2en": "kau",
      "iso639_3": "kau",
      "name": [
        "Kanuri"
      ],
      "nativeName": [
        "Kanuri"
      ],
      "direction": "LTR",
      "family": "Nilo-Saharan",
      "countries": [
        "NER"
      ]
    },
    {
      "iso639_1": "ks",
      "iso639_2": "kas",
      "iso639_2en": "kas",
      "iso639_3": "kas",
      "name": [
        "Kashmiri"
      ],
      "nativeName": [
        "कश्मीरी",
        "كشميري‎"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "kk",
      "iso639_2": "kaz",
      "iso639_2en": "kaz",
      "iso639_3": "kaz",
      "name": [
        "Kazakh"
      ],
      "nativeName": [
        "қазақ тілі"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "KAZ"
      ],
      "langCultureMs": [
        {
          "langCultureName": "kk-KZ",
          "displayName": "Kazakh - Kazakhstan",
          "cultureCode": "0x043F"
        }
      ]
    },
    {
      "iso639_1": "km",
      "iso639_2": "khm",
      "iso639_2en": "khm",
      "iso639_3": "khm",
      "name": [
        "Khmer"
      ],
      "nativeName": [
        "ខ្មែរ",
        "ខេមរភាសា",
        "ភាសាខ្មែរ"
      ],
      "direction": "LTR",
      "family": "Austroasiatic",
      "countries": [
        "KHM"
      ]
    },
    {
      "iso639_1": "ki",
      "iso639_2": "kik",
      "iso639_2en": "kik",
      "iso639_3": "kik",
      "name": [
        "Kikuyu",
        "Gikuyu"
      ],
      "nativeName": [
        "Gĩkũyũ"
      ],
      "direction": "LTR",
      "family": "Niger–Congo"
    },
    {
      "iso639_1": "rw",
      "iso639_2": "kin",
      "iso639_2en": "kin",
      "iso639_3": "kin",
      "name": [
        "Kinyarwanda"
      ],
      "nativeName": [
        "Ikinyarwanda"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "RWA"
      ]
    },
    {
      "iso639_1": "ky",
      "iso639_2": "kir",
      "iso639_2en": "kir",
      "iso639_3": "kir",
      "name": [
        "Kyrgyz"
      ],
      "nativeName": [
        "Кыргызча",
        "Кыргыз тили"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "KGZ"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ky-KZ",
          "displayName": "Kyrgyz - Kazakhstan",
          "cultureCode": "0x0440"
        }
      ]
    },
    {
      "iso639_1": "kv",
      "iso639_2": "kom",
      "iso639_2en": "kom",
      "iso639_3": "kom",
      "name": [
        "Komi"
      ],
      "nativeName": [
        "коми кыв"
      ],
      "direction": "LTR",
      "family": "Uralic"
    },
    {
      "iso639_1": "kg",
      "iso639_2": "kon",
      "iso639_2en": "kon",
      "iso639_3": "kon",
      "name": [
        "Kongo"
      ],
      "nativeName": [
        "Kikongo"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "AGO",
        "COD",
        "COG"
      ]
    },
    {
      "iso639_1": "ko",
      "iso639_2": "kor",
      "iso639_2en": "kor",
      "iso639_3": "kor",
      "name": [
        "Korean"
      ],
      "nativeName": [
        "한국어",
        "조선어"
      ],
      "direction": "LTR",
      "family": "Koreanic",
      "countries": [
        "PRK",
        "KOR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ko-KR",
          "displayName": "Korean - Korea",
          "cultureCode": "0x0412"
        }
      ]
    },
    {
      "iso639_1": "ku",
      "iso639_2": "kur",
      "iso639_2en": "kur",
      "iso639_3": "kur",
      "name": [
        "Kurdish"
      ],
      "nativeName": [
        "Kurdî",
        "كوردی‎"
      ],
      "direction": "RTL",
      "family": "Indo-European",
      "countries": [
        "IRQ"
      ]
    },
    {
      "iso639_1": "kj",
      "iso639_2": "kua",
      "iso639_2en": "kua",
      "iso639_3": "kua",
      "name": [
        "Kwanyama",
        "Kuanyama"
      ],
      "nativeName": [
        "Kuanyama"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "AGO"
      ]
    },
    {
      "iso639_1": "la",
      "iso639_2": "lat",
      "iso639_2en": "lat",
      "iso639_3": "lat",
      "name": [
        "Latin"
      ],
      "nativeName": [
        "latine",
        "lingua latina"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "VAT"
      ]
    },
    {
      "iso639_1": "lb",
      "iso639_2": "ltz",
      "iso639_2en": "ltz",
      "iso639_3": "ltz",
      "name": [
        "Luxembourgish",
        "Letzeburgesch"
      ],
      "nativeName": [
        "Lëtzebuergesch"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "LUX"
      ]
    },
    {
      "iso639_1": "lg",
      "iso639_2": "lug",
      "iso639_2en": "lug",
      "iso639_3": "lug",
      "name": [
        "Ganda"
      ],
      "nativeName": [
        "Luganda"
      ],
      "direction": "LTR",
      "family": "Niger–Congo"
    },
    {
      "iso639_1": "li",
      "iso639_2": "lim",
      "iso639_2en": "lim",
      "iso639_3": "lim",
      "name": [
        "Limburgish",
        "Limburgan",
        "Limburger"
      ],
      "nativeName": [
        "Limburgs"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "ln",
      "iso639_2": "lin",
      "iso639_2en": "lin",
      "iso639_3": "lin",
      "name": [
        "Lingala"
      ],
      "nativeName": [
        "Lingála"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "COD",
        "COG"
      ]
    },
    {
      "iso639_1": "lo",
      "iso639_2": "lao",
      "iso639_2en": "lao",
      "iso639_3": "lao",
      "name": [
        "Lao"
      ],
      "nativeName": [
        "ພາສາລາວ"
      ],
      "direction": "LTR",
      "family": "Tai–Kadai",
      "countries": [
        "LAO"
      ]
    },
    {
      "iso639_1": "lt",
      "iso639_2": "lit",
      "iso639_2en": "lit",
      "iso639_3": "lit",
      "name": [
        "Lithuanian"
      ],
      "nativeName": [
        "lietuvių kalba"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "LTU"
      ],
      "langCultureMs": [
        {
          "langCultureName": "lt-LT",
          "displayName": "Lithuanian - Lithuania",
          "cultureCode": "0x0427"
        }
      ]
    },
    {
      "iso639_1": "lu",
      "iso639_2": "lub",
      "iso639_2en": "lub",
      "iso639_3": "lub",
      "name": [
        "Luba-Katanga"
      ],
      "nativeName": [
        "Tshiluba"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "COD"
      ]
    },
    {
      "iso639_1": "lv",
      "iso639_2": "lav",
      "iso639_2en": "lav",
      "iso639_3": "lav",
      "name": [
        "Latvian"
      ],
      "nativeName": [
        "latviešu valoda"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "LVA"
      ],
      "langCultureMs": [
        {
          "langCultureName": "lv-LV",
          "displayName": "Latvian - Latvia",
          "cultureCode": "0x0426"
        }
      ]
    },
    {
      "iso639_1": "gv",
      "iso639_2": "glv",
      "iso639_2en": "glv",
      "iso639_3": "glv",
      "name": [
        "Manx"
      ],
      "nativeName": [
        "Gaelg",
        "Gailck"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "mk",
      "iso639_2": "mkd",
      "iso639_2en": "mac",
      "iso639_3": "mkd",
      "name": [
        "Macedonian"
      ],
      "nativeName": [
        "македонски јазик"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "MKD"
      ],
      "langCultureMs": [
        {
          "langCultureName": "mk-MK",
          "displayName": "Macedonian (FYROM)",
          "cultureCode": "0x042F"
        }
      ]
    },
    {
      "iso639_1": "mg",
      "iso639_2": "mlg",
      "iso639_2en": "mlg",
      "iso639_3": "mlg",
      "name": [
        "Malagasy"
      ],
      "nativeName": [
        "fiteny malagasy"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "MDG"
      ]
    },
    {
      "iso639_1": "ms",
      "iso639_2": "msa",
      "iso639_2en": "may",
      "iso639_3": "msa",
      "name": [
        "Malay"
      ],
      "nativeName": [
        "bahasa Melayu",
        "بهاس ملايو‎"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "MYS",
        "BRN",
        "SGP",
        "IDN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ms-BN",
          "displayName": "Malay - Brunei",
          "cultureCode": "0x083E"
        },
        {
          "langCultureName": "ms-MY",
          "displayName": "Malay - Malaysia",
          "cultureCode": "0x043E"
        }
      ]
    },
    {
      "iso639_1": "ml",
      "iso639_2": "mal",
      "iso639_2en": "mal",
      "iso639_3": "mal",
      "name": [
        "Malayalam"
      ],
      "nativeName": [
        "മലയാളം"
      ],
      "direction": "LTR",
      "family": "Dravidian"
    },
    {
      "iso639_1": "mt",
      "iso639_2": "mlt",
      "iso639_2en": "mlt",
      "iso639_3": "mlt",
      "name": [
        "Maltese"
      ],
      "nativeName": [
        "Malti"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "MLT"
      ]
    },
    {
      "iso639_1": "mi",
      "iso639_2": "mri",
      "iso639_2en": "mao",
      "iso639_3": "mri",
      "name": [
        "Māori"
      ],
      "nativeName": [
        "te reo Māori"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "NZL"
      ]
    },
    {
      "iso639_1": "mr",
      "iso639_2": "mar",
      "iso639_2en": "mar",
      "iso639_3": "mar",
      "name": [
        "Marathi (Marāṭhī)"
      ],
      "nativeName": [
        "मराठी"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "langCultureMs": [
        {
          "langCultureName": "mr-IN",
          "displayName": "Marathi - India",
          "cultureCode": "0x044E"
        }
      ]
    },
    {
      "iso639_1": "mh",
      "iso639_2": "mah",
      "iso639_2en": "mah",
      "iso639_3": "mah",
      "name": [
        "Marshallese"
      ],
      "nativeName": [
        "Kajin M̧ajeļ"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "MHL"
      ]
    },
    {
      "iso639_1": "mn",
      "iso639_2": "mon",
      "iso639_2en": "mon",
      "iso639_3": "mon",
      "name": [
        "Mongolian"
      ],
      "nativeName": [
        "монгол"
      ],
      "direction": "LTR",
      "family": "Mongolic",
      "countries": [
        "MNG"
      ],
      "langCultureMs": [
        {
          "langCultureName": "mn-MN",
          "displayName": "Mongolian - Mongolia",
          "cultureCode": "0x0450"
        }
      ]
    },
    {
      "iso639_1": "na",
      "iso639_2": "nau",
      "iso639_2en": "nau",
      "iso639_3": "nau",
      "name": [
        "Nauru"
      ],
      "nativeName": [
        "Ekakairũ Naoero"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "nv",
      "iso639_2": "nav",
      "iso639_2en": "nav",
      "iso639_3": "nav",
      "name": [
        "Navajo",
        "Navaho"
      ],
      "nativeName": [
        "Diné bizaad",
        "Dinékʼehǰí"
      ],
      "direction": "LTR",
      "family": "Dené–Yeniseian"
    },
    {
      "iso639_1": "nb",
      "iso639_2": "nob",
      "iso639_2en": "nob",
      "iso639_3": "nob",
      "name": [
        "Norwegian Bokmål"
      ],
      "nativeName": [
        "Norsk bokmål"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "NOR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nb-NO",
          "displayName": "Norwegian (Bokmål) - Norway",
          "cultureCode": "0x0414"
        }
      ]
    },
    {
      "iso639_1": "nd",
      "iso639_2": "nde",
      "iso639_2en": "nde",
      "iso639_3": "nde",
      "name": [
        "Northern Ndebele"
      ],
      "nativeName": [
        "isiNdebele"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF",
        "ZWE"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "nso",
      "iso639_2en": "nso",
      "iso639_3": "nso",
      "name": [
        "Northern Sotho"
      ],
      "nativeName": [
        "Sesotho sa Leboa"
      ],
      "direction": "LTR",
      "family": "Niger-Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "ne",
      "iso639_2": "nep",
      "iso639_2en": "nep",
      "iso639_3": "nep",
      "name": [
        "Nepali"
      ],
      "nativeName": [
        "नेपाली"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "NPL"
      ]
    },
    {
      "iso639_1": "ng",
      "iso639_2": "ndo",
      "iso639_2en": "ndo",
      "iso639_3": "ndo",
      "name": [
        "Ndonga"
      ],
      "nativeName": [
        "Owambo"
      ],
      "direction": "LTR",
      "family": "Niger–Congo"
    },
    {
      "iso639_1": "nn",
      "iso639_2": "nno",
      "iso639_2en": "nno",
      "iso639_3": "nno",
      "name": [
        "Norwegian Nynorsk"
      ],
      "nativeName": [
        "Norsk nynorsk"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "NOR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nn-NO",
          "displayName": "Norwegian (Nynorsk) - Norway",
          "cultureCode": "0x0814"
        }
      ]
    },
    {
      "iso639_1": "no",
      "iso639_2": "nor",
      "iso639_2en": "nor",
      "iso639_3": "nor",
      "name": [
        "Norwegian"
      ],
      "nativeName": [
        "Norsk"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "NOR"
      ]
    },
    {
      "iso639_1": "ii",
      "iso639_2": "iii",
      "iso639_2en": "iii",
      "iso639_3": "iii",
      "name": [
        "Nuosu"
      ],
      "nativeName": [
        "Nuosuhxop"
      ],
      "direction": "LTR",
      "family": "Sino-Tibetan"
    },
    {
      "iso639_1": "nr",
      "iso639_2": "nbl",
      "iso639_2en": "nbl",
      "iso639_3": "nbl",
      "name": [
        "Southern Ndebele"
      ],
      "nativeName": [
        "isiNdebele"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "oc",
      "iso639_2": "oci",
      "iso639_2en": "oci",
      "iso639_3": "oci",
      "name": [
        "Occitan"
      ],
      "nativeName": [
        "occitan",
        "lenga d'òc"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "oj",
      "iso639_2": "oji",
      "iso639_2en": "oji",
      "iso639_3": "oji",
      "name": [
        "Ojibwe",
        "Ojibwa"
      ],
      "nativeName": [
        "ᐊᓂᔑᓈᐯᒧᐎᓐ"
      ],
      "direction": "LTR",
      "family": "Algonquian"
    },
    {
      "iso639_1": "cu",
      "iso639_2": "chu",
      "iso639_2en": "chu",
      "iso639_3": "chu",
      "name": [
        "Old Church Slavonic",
        "Church Slavonic",
        "Old Bulgarian"
      ],
      "nativeName": [
        "ѩзыкъ словѣньскъ"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "om",
      "iso639_2": "orm",
      "iso639_2en": "orm",
      "iso639_3": "orm",
      "name": [
        "Oromo"
      ],
      "nativeName": [
        "Afaan Oromoo"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic"
    },
    {
      "iso639_1": "or",
      "iso639_2": "ori",
      "iso639_2en": "ori",
      "iso639_3": "ori",
      "name": [
        "Oriya"
      ],
      "nativeName": [
        "ଓଡ଼ିଆ"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "os",
      "iso639_2": "oss",
      "iso639_2en": "oss",
      "iso639_3": "oss",
      "name": [
        "Ossetian",
        "Ossetic"
      ],
      "nativeName": [
        "ирон æвзаг"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": []
    },
    {
      "iso639_1": "pa",
      "iso639_2": "pan",
      "iso639_2en": "pan",
      "iso639_3": "pan",
      "name": [
        "Panjabi",
        "Punjabi"
      ],
      "nativeName": [
        "ਪੰਜਾਬੀ",
        "پنجابی‎"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "IND"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pa-IN",
          "displayName": "Punjabi - India",
          "cultureCode": "0x0446"
        }
      ]
    },
    {
      "iso639_1": "pi",
      "iso639_2": "pli",
      "iso639_2en": "pli",
      "iso639_3": "pli",
      "name": [
        "Pāli"
      ],
      "nativeName": [
        "पाऴि"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "fa",
      "iso639_2": "fas",
      "iso639_2en": "per",
      "iso639_3": "fas",
      "name": [
        "Persian",
        "Farsi"
      ],
      "nativeName": [
        "فارسی"
      ],
      "direction": "RTL",
      "family": "Indo-European",
      "countries": [
        "IRN",
        "AFG",
        "TJK"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fa-IR",
          "displayName": "Farsi - Iran",
          "cultureCode": "0x0429"
        }
      ]
    },
    {
      "iso639_1": "pl",
      "iso639_2": "pol",
      "iso639_2en": "pol",
      "iso639_3": "pol",
      "name": [
        "Polish"
      ],
      "nativeName": [
        "język polski",
        "polszczyzna"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "POL"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pl-PL",
          "displayName": "Polish - Poland",
          "cultureCode": "0x0415"
        }
      ]
    },
    {
      "iso639_1": "ps",
      "iso639_2": "pus",
      "iso639_2en": "pus",
      "iso639_3": "pus",
      "name": [
        "Pashto",
        "Pushto"
      ],
      "nativeName": [
        "پښتو"
      ],
      "direction": "RTL",
      "family": "Indo-European",
      "countries": [
        "AFG"
      ]
    },
    {
      "iso639_1": "pt",
      "iso639_2": "por",
      "iso639_2en": "por",
      "iso639_3": "por",
      "name": [
        "Portuguese"
      ],
      "nativeName": [
        "português"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "AGO",
        "BRA",
        "CPV",
        "TLS",
        "GNQ",
        "GNB",
        "MAC",
        "MOZ",
        "PRT",
        "STP"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pt-BR",
          "displayName": "Portuguese - Brazil",
          "cultureCode": "0x0416"
        },
        {
          "langCultureName": "pt-PT",
          "displayName": "Portuguese - Portugal",
          "cultureCode": "0x0816"
        }
      ]
    },
    {
      "iso639_1": "qu",
      "iso639_2": "que",
      "iso639_2en": "que",
      "iso639_3": "que",
      "name": [
        "Quechua"
      ],
      "nativeName": [
        "Runa Simi",
        "Kichwa"
      ],
      "direction": "LTR",
      "family": "Quechuan",
      "countries": [
        "BOL",
        "PER"
      ]
    },
    {
      "iso639_1": "rm",
      "iso639_2": "roh",
      "iso639_2en": "roh",
      "iso639_3": "roh",
      "name": [
        "Romansh"
      ],
      "nativeName": [
        "rumantsch grischun"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "CHE"
      ]
    },
    {
      "iso639_1": "rn",
      "iso639_2": "run",
      "iso639_2en": "run",
      "iso639_3": "run",
      "name": [
        "Kirundi"
      ],
      "nativeName": [
        "Ikirundi"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "BDI"
      ]
    },
    {
      "iso639_1": "ro",
      "iso639_2": "ron",
      "iso639_2en": "rum",
      "iso639_3": "ron",
      "name": [
        "Romanian"
      ],
      "nativeName": [
        "limba română"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ROU",
        "MDA"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ro-RO",
          "displayName": "Romanian - Romania",
          "cultureCode": "0x0418"
        }
      ]
    },
    {
      "iso639_1": "ru",
      "iso639_2": "rus",
      "iso639_2en": "rus",
      "iso639_3": "rus",
      "name": [
        "Russian"
      ],
      "nativeName": [
        "русский язык"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "RUS",
        "BLR",
        "KAZ",
        "KGZ",
        "TJK"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ru-RU",
          "displayName": "Russian - Russia",
          "cultureCode": "0x0419"
        }
      ]
    },
    {
      "iso639_1": "sa",
      "iso639_2": "san",
      "iso639_2en": "san",
      "iso639_3": "san",
      "name": [
        "Sanskrit (Saṁskṛta)"
      ],
      "nativeName": [
        "संस्कृतम्"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "langCultureMs": [
        {
          "langCultureName": "sa-IN",
          "displayName": "Sanskrit - India",
          "cultureCode": "0x044F"
        }
      ]
    },
    {
      "iso639_1": "sc",
      "iso639_2": "srd",
      "iso639_2en": "srd",
      "iso639_3": "srd",
      "name": [
        "Sardinian"
      ],
      "nativeName": [
        "sardu"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "sd",
      "iso639_2": "snd",
      "iso639_2en": "snd",
      "iso639_3": "snd",
      "name": [
        "Sindhi"
      ],
      "nativeName": [
        "सिन्धी",
        "سنڌي، سندھی‎"
      ],
      "direction": "RTL",
      "family": "Indo-European"
    },
    {
      "iso639_1": "se",
      "iso639_2": "sme",
      "iso639_2en": "sme",
      "iso639_3": "sme",
      "name": [
        "Northern Sami"
      ],
      "nativeName": [
        "Davvisámegiella"
      ],
      "direction": "LTR",
      "family": "Uralic"
    },
    {
      "iso639_1": "sm",
      "iso639_2": "smo",
      "iso639_2en": "smo",
      "iso639_3": "smo",
      "name": [
        "Samoan"
      ],
      "nativeName": [
        "gagana fa'a Samoa"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "sg",
      "iso639_2": "sag",
      "iso639_2en": "sag",
      "iso639_3": "sag",
      "name": [
        "Sango"
      ],
      "nativeName": [
        "yângâ tî sängö"
      ],
      "direction": "LTR",
      "family": "Creole",
      "countries": [
        "CAF"
      ]
    },
    {
      "iso639_1": "sr",
      "iso639_2": "srp",
      "iso639_2en": "srp",
      "iso639_3": "srp",
      "name": [
        "Serbian"
      ],
      "nativeName": [
        "српски језик"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "SRB",
        "BIH"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-sr-SP",
          "displayName": "Serbian (Cyrillic) - Serbia",
          "cultureCode": "0x0C1A"
        },
        {
          "langCultureName": "Lt-sr-SP",
          "displayName": "Serbian (Latin) - Serbia",
          "cultureCode": "0x081A"
        }
      ]
    },
    {
      "iso639_1": "gd",
      "iso639_2": "gla",
      "iso639_2en": "gla",
      "iso639_3": "gla",
      "name": [
        "Scottish Gaelic",
        "Gaelic"
      ],
      "nativeName": [
        "Gàidhlig"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "sn",
      "iso639_2": "sna",
      "iso639_2en": "sna",
      "iso639_3": "sna",
      "name": [
        "Shona"
      ],
      "nativeName": [
        "chiShona"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZWE"
      ]
    },
    {
      "iso639_1": "si",
      "iso639_2": "sin",
      "iso639_2en": "sin",
      "iso639_3": "sin",
      "name": [
        "Sinhala",
        "Sinhalese"
      ],
      "nativeName": [
        "සිංහල"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "LKA"
      ]
    },
    {
      "iso639_1": "sk",
      "iso639_2": "slk",
      "iso639_2en": "slo",
      "iso639_3": "slk",
      "name": [
        "Slovak"
      ],
      "nativeName": [
        "slovenčina",
        "slovenský jazyk"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "SVK",
        "CZE"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sk-SK",
          "displayName": "Slovak - Slovakia",
          "cultureCode": "0x041B"
        }
      ]
    },
    {
      "iso639_1": "sl",
      "iso639_2": "slv",
      "iso639_2en": "slv",
      "iso639_3": "slv",
      "name": [
        "Slovene"
      ],
      "nativeName": [
        "slovenski jezik",
        "slovenščina"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "SVN"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sl-SI",
          "displayName": "Slovenian - Slovenia",
          "cultureCode": "0x0424"
        }
      ]
    },
    {
      "iso639_1": "so",
      "iso639_2": "som",
      "iso639_2en": "som",
      "iso639_3": "som",
      "name": [
        "Somali"
      ],
      "nativeName": [
        "Soomaaliga",
        "af Soomaali"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "DJI",
        "SOM"
      ]
    },
    {
      "iso639_1": "st",
      "iso639_2": "sot",
      "iso639_2en": "sot",
      "iso639_3": "sot",
      "name": [
        "Southern Sotho"
      ],
      "nativeName": [
        "Sesotho"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "LSO",
        "ZAF"
      ]
    },
    {
      "iso639_1": "es",
      "iso639_2": "spa",
      "iso639_2en": "spa",
      "iso639_3": "spa",
      "name": [
        "Spanish",
        "Castilian"
      ],
      "nativeName": [
        "español",
        "castellano"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "ARG",
        "BOL",
        "CHL",
        "COL",
        "CRI",
        "CUB",
        "DOM",
        "ECU",
        "SLV",
        "GNQ",
        "GTM",
        "HND",
        "MEX",
        "NIC",
        "PAN",
        "PRY",
        "PER",
        "PRI",
        "ESP",
        "URY",
        "VEN",
        "ESH"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-AR",
          "displayName": "Spanish - Argentina",
          "cultureCode": "0x2C0A"
        },
        {
          "langCultureName": "es-BO",
          "displayName": "Spanish - Bolivia",
          "cultureCode": "0x400A"
        },
        {
          "langCultureName": "es-CL",
          "displayName": "Spanish - Chile",
          "cultureCode": "0x340A"
        },
        {
          "langCultureName": "es-CO",
          "displayName": "Spanish - Colombia",
          "cultureCode": "0x240A"
        },
        {
          "langCultureName": "es-CR",
          "displayName": "Spanish - Costa Rica",
          "cultureCode": "0x140A"
        },
        {
          "langCultureName": "es-DO",
          "displayName": "Spanish - Dominican Republic",
          "cultureCode": "0x1C0A"
        },
        {
          "langCultureName": "es-EC",
          "displayName": "Spanish - Ecuador",
          "cultureCode": "0x300A"
        },
        {
          "langCultureName": "es-SV",
          "displayName": "Spanish - El Salvador",
          "cultureCode": "0x440A"
        },
        {
          "langCultureName": "es-GT",
          "displayName": "Spanish - Guatemala",
          "cultureCode": "0x100A"
        },
        {
          "langCultureName": "es-HN",
          "displayName": "Spanish - Honduras",
          "cultureCode": "0x480A"
        },
        {
          "langCultureName": "es-MX",
          "displayName": "Spanish - Mexico",
          "cultureCode": "0x080A"
        },
        {
          "langCultureName": "es-NI",
          "displayName": "Spanish - Nicaragua",
          "cultureCode": "0x4C0A"
        },
        {
          "langCultureName": "es-PA",
          "displayName": "Spanish - Panama",
          "cultureCode": "0x180A"
        },
        {
          "langCultureName": "es-PY",
          "displayName": "Spanish - Paraguay",
          "cultureCode": "0x3C0A"
        },
        {
          "langCultureName": "es-PE",
          "displayName": "Spanish - Peru",
          "cultureCode": "0x280A"
        },
        {
          "langCultureName": "es-PR",
          "displayName": "Spanish - Puerto Rico",
          "cultureCode": "0x500A"
        },
        {
          "langCultureName": "es-ES",
          "displayName": "Spanish - Spain",
          "cultureCode": "0x0C0A"
        },
        {
          "langCultureName": "es-UY",
          "displayName": "Spanish - Uruguay",
          "cultureCode": "0x380A"
        },
        {
          "langCultureName": "es-VE",
          "displayName": "Spanish - Venezuela",
          "cultureCode": "0x200A"
        }
      ]
    },
    {
      "iso639_1": "su",
      "iso639_2": "sun",
      "iso639_2en": "sun",
      "iso639_3": "sun",
      "name": [
        "Sundanese"
      ],
      "nativeName": [
        "Basa Sunda"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "sw",
      "iso639_2": "swa",
      "iso639_2en": "swa",
      "iso639_3": "swa",
      "name": [
        "Swahili"
      ],
      "nativeName": [
        "Kiswahili"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "COD",
        "KEN",
        "TZA",
        "UGA"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sw-KE",
          "displayName": "Swahili - Kenya",
          "cultureCode": "0x0441"
        }
      ]
    },
    {
      "iso639_1": "ss",
      "iso639_2": "ssw",
      "iso639_2en": "ssw",
      "iso639_3": "ssw",
      "name": [
        "Swati"
      ],
      "nativeName": [
        "SiSwati"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "SWZ",
        "ZAF"
      ]
    },
    {
      "iso639_1": "sv",
      "iso639_2": "swe",
      "iso639_2en": "swe",
      "iso639_3": "swe",
      "name": [
        "Swedish"
      ],
      "nativeName": [
        "Svenska"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "SWE",
        "FIN",
        "ALA"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sv-FI",
          "displayName": "Swedish - Finland",
          "cultureCode": "0x081D"
        },
        {
          "langCultureName": "sv-SE",
          "displayName": "Swedish - Sweden",
          "cultureCode": "0x041D"
        }
      ]
    },
    {
      "iso639_1": "ta",
      "iso639_2": "tam",
      "iso639_2en": "tam",
      "iso639_3": "tam",
      "name": [
        "Tamil"
      ],
      "nativeName": [
        "தமிழ்"
      ],
      "direction": "LTR",
      "family": "Dravidian",
      "countries": [
        "IND",
        "SGP",
        "LKA",
        "MYS",
        "MUS"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ta-IN",
          "displayName": "Tamil - India",
          "cultureCode": "0x0449"
        }
      ]
    },
    {
      "iso639_1": "te",
      "iso639_2": "tel",
      "iso639_2en": "tel",
      "iso639_3": "tel",
      "name": [
        "Telugu"
      ],
      "nativeName": [
        "తెలుగు"
      ],
      "direction": "LTR",
      "family": "Dravidian",
      "countries": [
        "IND"
      ],
      "langCultureMs": [
        {
          "langCultureName": "te-IN",
          "displayName": "Telugu - India",
          "cultureCode": "0x044A"
        }
      ]
    },
    {
      "iso639_1": "tg",
      "iso639_2": "tgk",
      "iso639_2en": "tgk",
      "iso639_3": "tgk",
      "name": [
        "Tajik"
      ],
      "nativeName": [
        "тоҷикӣ",
        "toğikī",
        "تاجیکی‎"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "TJK"
      ]
    },
    {
      "iso639_1": "th",
      "iso639_2": "tha",
      "iso639_2en": "tha",
      "iso639_3": "tha",
      "name": [
        "Thai"
      ],
      "nativeName": [
        "ไทย"
      ],
      "direction": "LTR",
      "family": "Tai–Kadai",
      "countries": [
        "THA"
      ],
      "langCultureMs": [
        {
          "langCultureName": "th-TH",
          "displayName": "Thai - Thailand",
          "cultureCode": "0x041E"
        }
      ]
    },
    {
      "iso639_1": "ti",
      "iso639_2": "tir",
      "iso639_2en": "tir",
      "iso639_3": "tir",
      "name": [
        "Tigrinya"
      ],
      "nativeName": [
        "ትግርኛ"
      ],
      "direction": "LTR",
      "family": "Afro-Asiatic",
      "countries": [
        "ERI"
      ]
    },
    {
      "iso639_1": "bo",
      "iso639_2": "bod",
      "iso639_2en": "tib",
      "iso639_3": "bod",
      "name": [
        "Tibetan Standard",
        "Tibetan",
        "Central"
      ],
      "nativeName": [
        "བོད་ཡིག"
      ],
      "direction": "LTR",
      "family": "Sino-Tibetan"
    },
    {
      "iso639_1": "tk",
      "iso639_2": "tuk",
      "iso639_2en": "tuk",
      "iso639_3": "tuk",
      "name": [
        "Turkmen"
      ],
      "nativeName": [
        "Türkmen",
        "Түркмен"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "TKM"
      ]
    },
    {
      "iso639_1": "tl",
      "iso639_2": "tgl",
      "iso639_2en": "tgl",
      "iso639_3": "tgl",
      "name": [
        "Tagalog"
      ],
      "nativeName": [
        "Wikang Tagalog"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "PHL"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "fil",
      "iso639_2en": "fil",
      "iso639_3": "fil",
      "name": [
        "Filipino"
      ],
      "nativeName": [
        "Filipino"
      ],
      "direction": "LTR",
      "family": "Austronesian",
      "countries": [
        "PHL"
      ]
    },
    {
      "iso639_1": "tn",
      "iso639_2": "tsn",
      "iso639_2en": "tsn",
      "iso639_3": "tsn",
      "name": [
        "Tswana"
      ],
      "nativeName": [
        "Setswana"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "BWA",
        "ZAF"
      ]
    },
    {
      "iso639_1": "to",
      "iso639_2": "ton",
      "iso639_2en": "ton",
      "iso639_3": "ton",
      "name": [
        "Tonga (Tonga Islands)"
      ],
      "nativeName": [
        "faka Tonga"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "tr",
      "iso639_2": "tur",
      "iso639_2en": "tur",
      "iso639_3": "tur",
      "name": [
        "Turkish"
      ],
      "nativeName": [
        "Türkçe"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "TUR",
        "CYP"
      ],
      "langCultureMs": [
        {
          "langCultureName": "tr-TR",
          "displayName": "Turkish - Turkey",
          "cultureCode": "0x041F"
        }
      ]
    },
    {
      "iso639_1": "ts",
      "iso639_2": "tso",
      "iso639_2en": "tso",
      "iso639_3": "tso",
      "name": [
        "Tsonga"
      ],
      "nativeName": [
        "Xitsonga"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "tt",
      "iso639_2": "tat",
      "iso639_2en": "tat",
      "iso639_3": "tat",
      "name": [
        "Tatar"
      ],
      "nativeName": [
        "татар теле",
        "tatar tele"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "langCultureMs": [
        {
          "langCultureName": "tt-RU",
          "displayName": "Tatar - Russia",
          "cultureCode": "0x0444"
        }
      ]
    },
    {
      "iso639_1": "tw",
      "iso639_2": "twi",
      "iso639_2en": "twi",
      "iso639_3": "twi",
      "name": [
        "Twi"
      ],
      "nativeName": [
        "Twi"
      ],
      "direction": "LTR",
      "family": "Niger–Congo"
    },
    {
      "iso639_1": "ty",
      "iso639_2": "tah",
      "iso639_2en": "tah",
      "iso639_3": "tah",
      "name": [
        "Tahitian"
      ],
      "nativeName": [
        "Reo Tahiti"
      ],
      "direction": "LTR",
      "family": "Austronesian"
    },
    {
      "iso639_1": "ug",
      "iso639_2": "uig",
      "iso639_2en": "uig",
      "iso639_3": "uig",
      "name": [
        "Uyghur",
        "Uighur"
      ],
      "nativeName": [
        "Uyƣurqə",
        "ئۇيغۇرچە‎"
      ],
      "direction": "RTL",
      "family": "Turkic"
    },
    {
      "iso639_1": "uk",
      "iso639_2": "ukr",
      "iso639_2en": "ukr",
      "iso639_3": "ukr",
      "name": [
        "Ukrainian"
      ],
      "nativeName": [
        "українська мова"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "UKR"
      ],
      "langCultureMs": [
        {
          "langCultureName": "uk-UA",
          "displayName": "Ukrainian - Ukraine",
          "cultureCode": "0x0422"
        }
      ]
    },
    {
      "iso639_1": "ur",
      "iso639_2": "urd",
      "iso639_2en": "urd",
      "iso639_3": "urd",
      "name": [
        "Urdu"
      ],
      "nativeName": [
        "اردو"
      ],
      "direction": "RTL",
      "family": "Indo-European",
      "countries": [
        "PAK",
        "FJI"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ur-PK",
          "displayName": "Urdu - Pakistan",
          "cultureCode": "0x0420"
        }
      ]
    },
    {
      "iso639_1": "uz",
      "iso639_2": "uzb",
      "iso639_2en": "uzb",
      "iso639_3": "uzb",
      "name": [
        "Uzbek"
      ],
      "nativeName": [
        "O‘zbek",
        "Ўзбек",
        "أۇزبېك‎"
      ],
      "direction": "LTR",
      "family": "Turkic",
      "countries": [
        "UZB"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-uz-UZ",
          "displayName": "Uzbek (Cyrillic) - Uzbekistan",
          "cultureCode": "0x0843"
        },
        {
          "langCultureName": "Lt-uz-UZ",
          "displayName": "Uzbek (Latin) - Uzbekistan",
          "cultureCode": "0x0443"
        }
      ]
    },
    {
      "iso639_1": "ve",
      "iso639_2": "ven",
      "iso639_2en": "ven",
      "iso639_3": "ven",
      "name": [
        "Venda"
      ],
      "nativeName": [
        "Tshivenḓa"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "vi",
      "iso639_2": "vie",
      "iso639_2en": "vie",
      "iso639_3": "vie",
      "name": [
        "Vietnamese"
      ],
      "nativeName": [
        "Tiếng Việt"
      ],
      "direction": "LTR",
      "family": "Austroasiatic",
      "countries": [
        "VNM"
      ],
      "langCultureMs": [
        {
          "langCultureName": "vi-VN",
          "displayName": "Vietnamese - Vietnam",
          "cultureCode": "0x042A"
        }
      ]
    },
    {
      "iso639_1": "vo",
      "iso639_2": "vol",
      "iso639_2en": "vol",
      "iso639_3": "vol",
      "name": [
        "Volapük"
      ],
      "nativeName": [
        "Volapük"
      ],
      "direction": "LTR",
      "family": "Constructed"
    },
    {
      "iso639_1": "wa",
      "iso639_2": "wln",
      "iso639_2en": "wln",
      "iso639_3": "wln",
      "name": [
        "Walloon"
      ],
      "nativeName": [
        "walon"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "cy",
      "iso639_2": "cym",
      "iso639_2en": "wel",
      "iso639_3": "cym",
      "name": [
        "Welsh"
      ],
      "nativeName": [
        "Cymraeg"
      ],
      "direction": "LTR",
      "family": "Indo-European",
      "countries": [
        "GBR"
      ]
    },
    {
      "iso639_1": "wo",
      "iso639_2": "wol",
      "iso639_2en": "wol",
      "iso639_3": "wol",
      "name": [
        "Wolof"
      ],
      "nativeName": [
        "Wollof"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "SEN"
      ]
    },
    {
      "iso639_1": "fy",
      "iso639_2": "fry",
      "iso639_2en": "fry",
      "iso639_3": "fry",
      "name": [
        "Western Frisian"
      ],
      "nativeName": [
        "Frysk"
      ],
      "direction": "LTR",
      "family": "Indo-European"
    },
    {
      "iso639_1": "xh",
      "iso639_2": "xho",
      "iso639_2en": "xho",
      "iso639_3": "xho",
      "name": [
        "Xhosa"
      ],
      "nativeName": [
        "isiXhosa"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "yi",
      "iso639_2": "yid",
      "iso639_2en": "yid",
      "iso639_3": "yid",
      "name": [
        "Yiddish"
      ],
      "nativeName": [
        "ייִדיש"
      ],
      "direction": "RTL",
      "family": "Indo-European"
    },
    {
      "iso639_1": "yo",
      "iso639_2": "yor",
      "iso639_2en": "yor",
      "iso639_3": "yor",
      "name": [
        "Yoruba"
      ],
      "nativeName": [
        "Yorùbá"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "BEN",
        "NGA"
      ]
    },
    {
      "iso639_1": "za",
      "iso639_2": "zha",
      "iso639_2en": "zha",
      "iso639_3": "zha",
      "name": [
        "Zhuang",
        "Chuang"
      ],
      "nativeName": [
        "Saɯ cueŋƅ",
        "Saw cuengh"
      ],
      "direction": "LTR",
      "family": "Tai–Kadai"
    },
    {
      "iso639_1": "zu",
      "iso639_2": "zul",
      "iso639_2en": "zul",
      "iso639_3": "zul",
      "name": [
        "Zulu"
      ],
      "nativeName": [
        "isiZulu"
      ],
      "direction": "LTR",
      "family": "Niger–Congo",
      "countries": [
        "ZAF"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "ace",
      "iso639_2en": "ace",
      "iso639_3": "ace",
      "name": [
        "Achinese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ach",
      "iso639_2en": "ach",
      "iso639_3": "ach",
      "name": [
        "Acoli"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ada",
      "iso639_2en": "ada",
      "iso639_3": "ada",
      "name": [
        "Adangme"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ady",
      "iso639_2en": "ady",
      "iso639_3": "ady",
      "name": [
        "Adyghe",
        " Adygei"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "afa",
      "iso639_2en": "afa",
      "iso639_3": "afa",
      "name": [
        "Afro-Asiatic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "afh",
      "iso639_2en": "afh",
      "iso639_3": "afh",
      "name": [
        "Afrihili"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ain",
      "iso639_2en": "ain",
      "iso639_3": "ain",
      "name": [
        "Ainu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "akk",
      "iso639_2en": "akk",
      "iso639_3": "akk",
      "name": [
        "Akkadian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ale",
      "iso639_2en": "ale",
      "iso639_3": "ale",
      "name": [
        "Aleut"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "alg",
      "iso639_2en": "alg",
      "iso639_3": "alg",
      "name": [
        "Algonquian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "alt",
      "iso639_2en": "alt",
      "iso639_3": "alt",
      "name": [
        "Southern Altai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ang",
      "iso639_2en": "ang",
      "iso639_3": "ang",
      "name": [
        "English, Old (ca.450-1100)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "anp",
      "iso639_2en": "anp",
      "iso639_3": "anp",
      "name": [
        "Angika"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "apa",
      "iso639_2en": "apa",
      "iso639_3": "apa",
      "name": [
        "Apache languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "arc",
      "iso639_2en": "arc",
      "iso639_3": "arc",
      "name": [
        "Official Aramaic (700-300 BCE)",
        " Imperial Aramaic (700-300 BCE)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "RTL",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "arn",
      "iso639_2en": "arn",
      "iso639_3": "arn",
      "name": [
        "Mapudungun",
        " Mapuche"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "arp",
      "iso639_2en": "arp",
      "iso639_3": "arp",
      "name": [
        "Arapaho"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "art",
      "iso639_2en": "art",
      "iso639_3": "art",
      "name": [
        "Artificial languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "arw",
      "iso639_2en": "arw",
      "iso639_3": "arw",
      "name": [
        "Arawak"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ast",
      "iso639_2en": "ast",
      "iso639_3": "ast",
      "name": [
        "Asturian",
        " Bable",
        " Leonese",
        " Asturleonese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ath",
      "iso639_2en": "ath",
      "iso639_3": "ath",
      "name": [
        "Athapascan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "aus",
      "iso639_2en": "aus",
      "iso639_3": "aus",
      "name": [
        "Australian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "awa",
      "iso639_2en": "awa",
      "iso639_3": "awa",
      "name": [
        "Awadhi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bad",
      "iso639_2en": "bad",
      "iso639_3": "bad",
      "name": [
        "Banda languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bai",
      "iso639_2en": "bai",
      "iso639_3": "bai",
      "name": [
        "Bamileke languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bal",
      "iso639_2en": "bal",
      "iso639_3": "bal",
      "name": [
        "Baluchi",
        "Balochi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "RTL",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ban",
      "iso639_2en": "ban",
      "iso639_3": "ban",
      "name": [
        "Balinese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bas",
      "iso639_2en": "bas",
      "iso639_3": "bas",
      "name": [
        "Basa"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bat",
      "iso639_2en": "bat",
      "iso639_3": "bat",
      "name": [
        "Baltic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bej",
      "iso639_2en": "bej",
      "iso639_3": "bej",
      "name": [
        "Beja",
        " Bedawiyet"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bem",
      "iso639_2en": "bem",
      "iso639_3": "bem",
      "name": [
        "Bemba"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bho",
      "iso639_2en": "bho",
      "iso639_3": "bho",
      "name": [
        "Bhojpuri"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bik",
      "iso639_2en": "bik",
      "iso639_3": "bik",
      "name": [
        "Bikol"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bin",
      "iso639_2en": "bin",
      "iso639_3": "bin",
      "name": [
        "Bini",
        " Edo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bla",
      "iso639_2en": "bla",
      "iso639_3": "bla",
      "name": [
        "Siksika"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bnt",
      "iso639_2en": "bnt",
      "iso639_3": "bnt",
      "name": [
        "Bantu languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bra",
      "iso639_2en": "bra",
      "iso639_3": "bra",
      "name": [
        "Braj"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "btk",
      "iso639_2en": "btk",
      "iso639_3": "btk",
      "name": [
        "Batak languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bua",
      "iso639_2en": "bua",
      "iso639_3": "bua",
      "name": [
        "Buriat"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "bug",
      "iso639_2en": "bug",
      "iso639_3": "bug",
      "name": [
        "Buginese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "byn",
      "iso639_2en": "byn",
      "iso639_3": "byn",
      "name": [
        "Blin",
        " Bilin"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cad",
      "iso639_2en": "cad",
      "iso639_3": "cad",
      "name": [
        "Caddo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cai",
      "iso639_2en": "cai",
      "iso639_3": "cai",
      "name": [
        "Central American Indian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "car",
      "iso639_2en": "car",
      "iso639_3": "car",
      "name": [
        "Galibi Carib"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cau",
      "iso639_2en": "cau",
      "iso639_3": "cau",
      "name": [
        "Caucasian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ceb",
      "iso639_2en": "ceb",
      "iso639_3": "ceb",
      "name": [
        "Cebuano"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cel",
      "iso639_2en": "cel",
      "iso639_3": "cel",
      "name": [
        "Celtic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chb",
      "iso639_2en": "chb",
      "iso639_3": "chb",
      "name": [
        "Chibcha"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chg",
      "iso639_2en": "chg",
      "iso639_3": "chg",
      "name": [
        "Chagatai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chk",
      "iso639_2en": "chk",
      "iso639_3": "chk",
      "name": [
        "Chuukese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chm",
      "iso639_2en": "chm",
      "iso639_3": "chm",
      "name": [
        "Mari"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chn",
      "iso639_2en": "chn",
      "iso639_3": "chn",
      "name": [
        "Chinook jargon"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cho",
      "iso639_2en": "cho",
      "iso639_3": "cho",
      "name": [
        "Choctaw"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chp",
      "iso639_2en": "chp",
      "iso639_3": "chp",
      "name": [
        "Chipewyan",
        " Dene Suline"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chr",
      "iso639_2en": "chr",
      "iso639_3": "chr",
      "name": [
        "Cherokee"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "chy",
      "iso639_2en": "chy",
      "iso639_3": "chy",
      "name": [
        "Cheyenne"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cmc",
      "iso639_2en": "cmc",
      "iso639_3": "cmc",
      "name": [
        "Chamic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cop",
      "iso639_2en": "cop",
      "iso639_3": "cop",
      "name": [
        "Coptic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cpe",
      "iso639_2en": "cpe",
      "iso639_3": "cpe",
      "name": [
        "Creoles and pidgins, English based"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cpf",
      "iso639_2en": "cpf",
      "iso639_3": "cpf",
      "name": [
        "Creoles and pidgins, French-based"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cpp",
      "iso639_2en": "cpp",
      "iso639_3": "cpp",
      "name": [
        "Creoles and pidgins, Portuguese-based"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "crh",
      "iso639_2en": "crh",
      "iso639_3": "crh",
      "name": [
        "Crimean Tatar",
        " Crimean Turkish"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "crp",
      "iso639_2en": "crp",
      "iso639_3": "crp",
      "name": [
        "Creoles and pidgins"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "csb",
      "iso639_2en": "csb",
      "iso639_3": "csb",
      "name": [
        "Kashubian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "cus",
      "iso639_2en": "cus",
      "iso639_3": "cus",
      "name": [
        "Cushitic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dak",
      "iso639_2en": "dak",
      "iso639_3": "dak",
      "name": [
        "Dakota"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dar",
      "iso639_2en": "dar",
      "iso639_3": "dar",
      "name": [
        "Dargwa"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "day",
      "iso639_2en": "day",
      "iso639_3": "day",
      "name": [
        "Land Dayak languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "del",
      "iso639_2en": "del",
      "iso639_3": "del",
      "name": [
        "Delaware"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "den",
      "iso639_2en": "den",
      "iso639_3": "den",
      "name": [
        "Slave (Athapascan)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dgr",
      "iso639_2en": "dgr",
      "iso639_3": "dgr",
      "name": [
        "Dogrib"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "din",
      "iso639_2en": "din",
      "iso639_3": "din",
      "name": [
        "Dinka"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "doi",
      "iso639_2en": "doi",
      "iso639_3": "doi",
      "name": [
        "Dogri"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dra",
      "iso639_2en": "dra",
      "iso639_3": "dra",
      "name": [
        "Dravidian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dsb",
      "iso639_2en": "dsb",
      "iso639_3": "dsb",
      "name": [
        "Lower Sorbian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dua",
      "iso639_2en": "dua",
      "iso639_3": "dua",
      "name": [
        "Duala"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dum",
      "iso639_2en": "dum",
      "iso639_3": "dum",
      "name": [
        "Dutch, Middle (ca.1050-1350)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "dyu",
      "iso639_2en": "dyu",
      "iso639_3": "dyu",
      "name": [
        "Dyula"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "efi",
      "iso639_2en": "efi",
      "iso639_3": "efi",
      "name": [
        "Efik"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "egy",
      "iso639_2en": "egy",
      "iso639_3": "egy",
      "name": [
        "Egyptian (Ancient)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "eka",
      "iso639_2en": "eka",
      "iso639_3": "eka",
      "name": [
        "Ekajuk"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "elx",
      "iso639_2en": "elx",
      "iso639_3": "elx",
      "name": [
        "Elamite"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "enm",
      "iso639_2en": "enm",
      "iso639_3": "enm",
      "name": [
        "English, Middle (1100-1500)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ewo",
      "iso639_2en": "ewo",
      "iso639_3": "ewo",
      "name": [
        "Ewondo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fan",
      "iso639_2en": "fan",
      "iso639_3": "fan",
      "name": [
        "Fang"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fat",
      "iso639_2en": "fat",
      "iso639_3": "fat",
      "name": [
        "Fanti"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fiu",
      "iso639_2en": "fiu",
      "iso639_3": "fiu",
      "name": [
        "Finno-Ugrian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fon",
      "iso639_2en": "fon",
      "iso639_3": "fon",
      "name": [
        "Fon"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "frm",
      "iso639_2en": "frm",
      "iso639_3": "frm",
      "name": [
        "French, Middle (ca.1400-1600)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fro",
      "iso639_2en": "fro",
      "iso639_3": "fro",
      "name": [
        "French, Old (842-ca.1400)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "frr",
      "iso639_2en": "frr",
      "iso639_3": "frr",
      "name": [
        "Northern Frisian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "frs",
      "iso639_2en": "frs",
      "iso639_3": "frs",
      "name": [
        "Eastern Frisian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "fur",
      "iso639_2en": "fur",
      "iso639_3": "fur",
      "name": [
        "Friulian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gaa",
      "iso639_2en": "gaa",
      "iso639_3": "gaa",
      "name": [
        "Ga"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "GHA"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "gay",
      "iso639_2en": "gay",
      "iso639_3": "gay",
      "name": [
        "Gayo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gba",
      "iso639_2en": "gba",
      "iso639_3": "gba",
      "name": [
        "Gbaya"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gem",
      "iso639_2en": "gem",
      "iso639_3": "gem",
      "name": [
        "Germanic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gez",
      "iso639_2en": "gez",
      "iso639_3": "gez",
      "name": [
        "Geez"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gil",
      "iso639_2en": "gil",
      "iso639_3": "gil",
      "name": [
        "Gilbertese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gmh",
      "iso639_2en": "gmh",
      "iso639_3": "gmh",
      "name": [
        "German, Middle High (ca.1050-1500)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "goh",
      "iso639_2en": "goh",
      "iso639_3": "goh",
      "name": [
        "German, Old High (ca.750-1050)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gon",
      "iso639_2en": "gon",
      "iso639_3": "gon",
      "name": [
        "Gondi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gor",
      "iso639_2en": "gor",
      "iso639_3": "gor",
      "name": [
        "Gorontalo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "got",
      "iso639_2en": "got",
      "iso639_3": "got",
      "name": [
        "Gothic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "grb",
      "iso639_2en": "grb",
      "iso639_3": "grb",
      "name": [
        "Grebo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "grc",
      "iso639_2en": "grc",
      "iso639_3": "grc",
      "name": [
        "Greek, Ancient (to 1453)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gsw",
      "iso639_2en": "gsw",
      "iso639_3": "gsw",
      "name": [
        "Swiss German",
        " Alemannic",
        " Alsatian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "gwi",
      "iso639_2en": "gwi",
      "iso639_3": "gwi",
      "name": [
        "Gwich'in"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hai",
      "iso639_2en": "hai",
      "iso639_3": "hai",
      "name": [
        "Haida"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "haw",
      "iso639_2en": "haw",
      "iso639_3": "haw",
      "name": [
        "Hawaiian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hil",
      "iso639_2en": "hil",
      "iso639_3": "hil",
      "name": [
        "Hiligaynon"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "him",
      "iso639_2en": "him",
      "iso639_3": "him",
      "name": [
        "Himachali languages",
        " Western Pahari languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hit",
      "iso639_2en": "hit",
      "iso639_3": "hit",
      "name": [
        "Hittite"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hmn",
      "iso639_2en": "hmn",
      "iso639_3": "hmn",
      "name": [
        "Hmong",
        " Mong"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hsb",
      "iso639_2en": "hsb",
      "iso639_3": "hsb",
      "name": [
        "Upper Sorbian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "hup",
      "iso639_2en": "hup",
      "iso639_3": "hup",
      "name": [
        "Hupa"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "iba",
      "iso639_2en": "iba",
      "iso639_3": "iba",
      "name": [
        "Iban"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ijo",
      "iso639_2en": "ijo",
      "iso639_3": "ijo",
      "name": [
        "Ijo languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ilo",
      "iso639_2en": "ilo",
      "iso639_3": "ilo",
      "name": [
        "Iloko"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "inc",
      "iso639_2en": "inc",
      "iso639_3": "inc",
      "name": [
        "Indic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ine",
      "iso639_2en": "ine",
      "iso639_3": "ine",
      "name": [
        "Indo-European languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "inh",
      "iso639_2en": "inh",
      "iso639_3": "inh",
      "name": [
        "Ingush"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ira",
      "iso639_2en": "ira",
      "iso639_3": "ira",
      "name": [
        "Iranian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "iro",
      "iso639_2en": "iro",
      "iso639_3": "iro",
      "name": [
        "Iroquoian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "jbo",
      "iso639_2en": "jbo",
      "iso639_3": "jbo",
      "name": [
        "Lojban"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "jpr",
      "iso639_2en": "jpr",
      "iso639_3": "jpr",
      "name": [
        "Judeo-Persian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "jrb",
      "iso639_2en": "jrb",
      "iso639_3": "jrb",
      "name": [
        "Judeo-Arabic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kaa",
      "iso639_2en": "kaa",
      "iso639_3": "kaa",
      "name": [
        "Kara-Kalpak"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kab",
      "iso639_2en": "kab",
      "iso639_3": "kab",
      "name": [
        "Kabyle"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kac",
      "iso639_2en": "kac",
      "iso639_3": "kac",
      "name": [
        "Kachin",
        " Jingpho"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kam",
      "iso639_2en": "kam",
      "iso639_3": "kam",
      "name": [
        "Kamba"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kar",
      "iso639_2en": "kar",
      "iso639_3": "kar",
      "name": [
        "Karen languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kaw",
      "iso639_2en": "kaw",
      "iso639_3": "kaw",
      "name": [
        "Kawi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kbd",
      "iso639_2en": "kbd",
      "iso639_3": "kbd",
      "name": [
        "Kabardian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kha",
      "iso639_2en": "kha",
      "iso639_3": "kha",
      "name": [
        "Khasi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "khi",
      "iso639_2en": "khi",
      "iso639_3": "khi",
      "name": [
        "Khoisan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kho",
      "iso639_2en": "kho",
      "iso639_3": "kho",
      "name": [
        "Khotanese",
        " Sakan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kmb",
      "iso639_2en": "kmb",
      "iso639_3": "kmb",
      "name": [
        "Kimbundu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "AGO"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "kok",
      "iso639_2en": "kok",
      "iso639_3": "kok",
      "name": [
        "Konkani"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "langCultureMs": [
        {
          "langCultureName": "kok-IN",
          "displayName": "Konkani - India",
          "cultureCode": "0x0457"
        }
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "kos",
      "iso639_2en": "kos",
      "iso639_3": "kos",
      "name": [
        "Kosraean"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kpe",
      "iso639_2en": "kpe",
      "iso639_3": "kpe",
      "name": [
        "Kpelle"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "krc",
      "iso639_2en": "krc",
      "iso639_3": "krc",
      "name": [
        "Karachay-Balkar"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "krl",
      "iso639_2en": "krl",
      "iso639_3": "krl",
      "name": [
        "Karelian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kro",
      "iso639_2en": "kro",
      "iso639_3": "kro",
      "name": [
        "Kru languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kru",
      "iso639_2en": "kru",
      "iso639_3": "kru",
      "name": [
        "Kurukh"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kum",
      "iso639_2en": "kum",
      "iso639_3": "kum",
      "name": [
        "Kumyk"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "kut",
      "iso639_2en": "kut",
      "iso639_3": "kut",
      "name": [
        "Kutenai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lad",
      "iso639_2en": "lad",
      "iso639_3": "lad",
      "name": [
        "Ladino"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lah",
      "iso639_2en": "lah",
      "iso639_3": "lah",
      "name": [
        "Lahnda"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lam",
      "iso639_2en": "lam",
      "iso639_3": "lam",
      "name": [
        "Lamba"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lez",
      "iso639_2en": "lez",
      "iso639_3": "lez",
      "name": [
        "Lezghian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lol",
      "iso639_2en": "lol",
      "iso639_3": "lol",
      "name": [
        "Mongo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "loz",
      "iso639_2en": "loz",
      "iso639_3": "loz",
      "name": [
        "Lozi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lua",
      "iso639_2en": "lua",
      "iso639_3": "lua",
      "name": [
        "Luba-Lulua"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lui",
      "iso639_2en": "lui",
      "iso639_3": "lui",
      "name": [
        "Luiseno"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lun",
      "iso639_2en": "lun",
      "iso639_3": "lun",
      "name": [
        "Lunda"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "luo",
      "iso639_2en": "luo",
      "iso639_3": "luo",
      "name": [
        "Luo (Kenya and Tanzania)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "lus",
      "iso639_2en": "lus",
      "iso639_3": "lus",
      "name": [
        "Lushai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mad",
      "iso639_2en": "mad",
      "iso639_3": "mad",
      "name": [
        "Madurese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mag",
      "iso639_2en": "mag",
      "iso639_3": "mag",
      "name": [
        "Magahi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mai",
      "iso639_2en": "mai",
      "iso639_3": "mai",
      "name": [
        "Maithili"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mak",
      "iso639_2en": "mak",
      "iso639_3": "mak",
      "name": [
        "Makasar"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "man",
      "iso639_2en": "man",
      "iso639_3": "man",
      "name": [
        "Mandingo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "map",
      "iso639_2en": "map",
      "iso639_3": "map",
      "name": [
        "Austronesian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mas",
      "iso639_2en": "mas",
      "iso639_3": "mas",
      "name": [
        "Masai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mdf",
      "iso639_2en": "mdf",
      "iso639_3": "mdf",
      "name": [
        "Moksha"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mdr",
      "iso639_2en": "mdr",
      "iso639_3": "mdr",
      "name": [
        "Mandar"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "men",
      "iso639_2en": "men",
      "iso639_3": "men",
      "name": [
        "Mende"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mga",
      "iso639_2en": "mga",
      "iso639_3": "mga",
      "name": [
        "Irish, Middle (900-1200)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mic",
      "iso639_2en": "mic",
      "iso639_3": "mic",
      "name": [
        "Mi'kmaq",
        " Micmac"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "min",
      "iso639_2en": "min",
      "iso639_3": "min",
      "name": [
        "Minangkabau"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mis",
      "iso639_2en": "mis",
      "iso639_3": "mis",
      "name": [
        "Uncoded languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mkh",
      "iso639_2en": "mkh",
      "iso639_3": "mkh",
      "name": [
        "Mon-Khmer languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mnc",
      "iso639_2en": "mnc",
      "iso639_3": "mnc",
      "name": [
        "Manchu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mni",
      "iso639_2en": "mni",
      "iso639_3": "mni",
      "name": [
        "Manipuri"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mno",
      "iso639_2en": "mno",
      "iso639_3": "mno",
      "name": [
        "Manobo languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "moh",
      "iso639_2en": "moh",
      "iso639_3": "moh",
      "name": [
        "Mohawk"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mos",
      "iso639_2en": "mos",
      "iso639_3": "mos",
      "name": [
        "Mossi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "BFA"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "mul",
      "iso639_2en": "mul",
      "iso639_3": "mul",
      "name": [
        "Multiple languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mun",
      "iso639_2en": "mun",
      "iso639_3": "mun",
      "name": [
        "Munda languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mus",
      "iso639_2en": "mus",
      "iso639_3": "mus",
      "name": [
        "Creek"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mwl",
      "iso639_2en": "mwl",
      "iso639_3": "mwl",
      "name": [
        "Mirandese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "mwr",
      "iso639_2en": "mwr",
      "iso639_3": "mwr",
      "name": [
        "Marwari"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "myn",
      "iso639_2en": "myn",
      "iso639_3": "myn",
      "name": [
        "Mayan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "myv",
      "iso639_2en": "myv",
      "iso639_3": "myv",
      "name": [
        "Erzya"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nah",
      "iso639_2en": "nah",
      "iso639_3": "nah",
      "name": [
        "Nahuatl languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nai",
      "iso639_2en": "nai",
      "iso639_3": "nai",
      "name": [
        "North American Indian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nap",
      "iso639_2en": "nap",
      "iso639_3": "nap",
      "name": [
        "Neapolitan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nds",
      "iso639_2en": "nds",
      "iso639_3": "nds",
      "name": [
        "Low German",
        " Low Saxon",
        " German, Low",
        " Saxon, Low"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "new",
      "iso639_2en": "new",
      "iso639_3": "new",
      "name": [
        "Nepal Bhasa",
        " Newari"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nia",
      "iso639_2en": "nia",
      "iso639_3": "nia",
      "name": [
        "Nias"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nic",
      "iso639_2en": "nic",
      "iso639_3": "nic",
      "name": [
        "Niger-Kordofanian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "niu",
      "iso639_2en": "niu",
      "iso639_3": "niu",
      "name": [
        "Niuean"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nog",
      "iso639_2en": "nog",
      "iso639_3": "nog",
      "name": [
        "Nogai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "non",
      "iso639_2en": "non",
      "iso639_3": "non",
      "name": [
        "Norse, Old"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nqo",
      "iso639_2en": "nqo",
      "iso639_3": "nqo",
      "name": [
        "N'Ko"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nub",
      "iso639_2en": "nub",
      "iso639_3": "nub",
      "name": [
        "Nubian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nwc",
      "iso639_2en": "nwc",
      "iso639_3": "nwc",
      "name": [
        "Classical Newari",
        " Old Newari",
        " Classical Nepal Bhasa"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nym",
      "iso639_2en": "nym",
      "iso639_3": "nym",
      "name": [
        "Nyamwezi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nyn",
      "iso639_2en": "nyn",
      "iso639_3": "nyn",
      "name": [
        "Nyankole"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nyo",
      "iso639_2en": "nyo",
      "iso639_3": "nyo",
      "name": [
        "Nyoro"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "nzi",
      "iso639_2en": "nzi",
      "iso639_3": "nzi",
      "name": [
        "Nzima"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "osa",
      "iso639_2en": "osa",
      "iso639_3": "osa",
      "name": [
        "Osage"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ota",
      "iso639_2en": "ota",
      "iso639_3": "ota",
      "name": [
        "Turkish, Ottoman (1500-1928)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "oto",
      "iso639_2en": "oto",
      "iso639_3": "oto",
      "name": [
        "Otomian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "paa",
      "iso639_2en": "paa",
      "iso639_3": "paa",
      "name": [
        "Papuan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pag",
      "iso639_2en": "pag",
      "iso639_3": "pag",
      "name": [
        "Pangasinan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pal",
      "iso639_2en": "pal",
      "iso639_3": "pal",
      "name": [
        "Pahlavi"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pam",
      "iso639_2en": "pam",
      "iso639_3": "pam",
      "name": [
        "Pampanga",
        " Kapampangan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pap",
      "iso639_2en": "pap",
      "iso639_3": "pap",
      "name": [
        "Papiamento"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "ABW",
        "CUW"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "pau",
      "iso639_2en": "pau",
      "iso639_3": "pau",
      "name": [
        "Palauan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "peo",
      "iso639_2en": "peo",
      "iso639_3": "peo",
      "name": [
        "Persian, Old (ca.600-400 B.C.)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "phi",
      "iso639_2en": "phi",
      "iso639_3": "phi",
      "name": [
        "Philippine languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "phn",
      "iso639_2en": "phn",
      "iso639_3": "phn",
      "name": [
        "Phoenician"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pon",
      "iso639_2en": "pon",
      "iso639_3": "pon",
      "name": [
        "Pohnpeian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pra",
      "iso639_2en": "pra",
      "iso639_3": "pra",
      "name": [
        "Prakrit languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "pro",
      "iso639_2en": "pro",
      "iso639_3": "pro",
      "name": [
        "Proven�al, Old (to 1500)",
        "Occitan, Old (to 1500)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "qaa-qtz",
      "iso639_2en": "qaa-qtz",
      "iso639_3": "qaa-qtz",
      "name": [
        "Reserved for local use"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "raj",
      "iso639_2en": "raj",
      "iso639_3": "raj",
      "name": [
        "Rajasthani"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "rap",
      "iso639_2en": "rap",
      "iso639_3": "rap",
      "name": [
        "Rapanui"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "rar",
      "iso639_2en": "rar",
      "iso639_3": "rar",
      "name": [
        "Rarotongan",
        " Cook Islands Maori"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "roa",
      "iso639_2en": "roa",
      "iso639_3": "roa",
      "name": [
        "Romance languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "rom",
      "iso639_2en": "rom",
      "iso639_3": "rom",
      "name": [
        "Romany"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "rup",
      "iso639_2en": "rup",
      "iso639_3": "rup",
      "name": [
        "Aromanian",
        " Arumanian",
        " Macedo-Romanian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sad",
      "iso639_2en": "sad",
      "iso639_3": "sad",
      "name": [
        "Sandawe"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sah",
      "iso639_2en": "sah",
      "iso639_3": "sah",
      "name": [
        "Yakut"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sai",
      "iso639_2en": "sai",
      "iso639_3": "sai",
      "name": [
        "South American Indian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sal",
      "iso639_2en": "sal",
      "iso639_3": "sal",
      "name": [
        "Salishan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sam",
      "iso639_2en": "sam",
      "iso639_3": "sam",
      "name": [
        "Samaritan Aramaic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sas",
      "iso639_2en": "sas",
      "iso639_3": "sas",
      "name": [
        "Sasak"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sat",
      "iso639_2en": "sat",
      "iso639_3": "sat",
      "name": [
        "Santali"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "scn",
      "iso639_2en": "scn",
      "iso639_3": "scn",
      "name": [
        "Sicilian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sco",
      "iso639_2en": "sco",
      "iso639_3": "sco",
      "name": [
        "Scots"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sel",
      "iso639_2en": "sel",
      "iso639_3": "sel",
      "name": [
        "Selkup"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sem",
      "iso639_2en": "sem",
      "iso639_3": "sem",
      "name": [
        "Semitic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sga",
      "iso639_2en": "sga",
      "iso639_3": "sga",
      "name": [
        "Irish, Old (to 900)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sgn",
      "iso639_2en": "sgn",
      "iso639_3": "sgn",
      "name": [
        "Sign Languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "shn",
      "iso639_2en": "shn",
      "iso639_3": "shn",
      "name": [
        "Shan"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sid",
      "iso639_2en": "sid",
      "iso639_3": "sid",
      "name": [
        "Sidamo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sio",
      "iso639_2en": "sio",
      "iso639_3": "sio",
      "name": [
        "Siouan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sit",
      "iso639_2en": "sit",
      "iso639_3": "sit",
      "name": [
        "Sino-Tibetan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sla",
      "iso639_2en": "sla",
      "iso639_3": "sla",
      "name": [
        "Slavic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sma",
      "iso639_2en": "sma",
      "iso639_3": "sma",
      "name": [
        "Southern Sami"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "smi",
      "iso639_2en": "smi",
      "iso639_3": "smi",
      "name": [
        "Sami languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "smj",
      "iso639_2en": "smj",
      "iso639_3": "smj",
      "name": [
        "Lule Sami"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "smn",
      "iso639_2en": "smn",
      "iso639_3": "smn",
      "name": [
        "Inari Sami"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sms",
      "iso639_2en": "sms",
      "iso639_3": "sms",
      "name": [
        "Skolt Sami"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "snk",
      "iso639_2en": "snk",
      "iso639_3": "snk",
      "name": [
        "Soninke"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "MLI",
        "SEN"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "sog",
      "iso639_2en": "sog",
      "iso639_3": "sog",
      "name": [
        "Sogdian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "son",
      "iso639_2en": "son",
      "iso639_3": "son",
      "name": [
        "Songhai languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "srn",
      "iso639_2en": "srn",
      "iso639_3": "srn",
      "name": [
        "Sranan Tongo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "srr",
      "iso639_2en": "srr",
      "iso639_3": "srr",
      "name": [
        "Serer"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "SEN"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "ssa",
      "iso639_2en": "ssa",
      "iso639_3": "ssa",
      "name": [
        "Nilo-Saharan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "suk",
      "iso639_2en": "suk",
      "iso639_3": "suk",
      "name": [
        "Sukuma"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sus",
      "iso639_2en": "sus",
      "iso639_3": "sus",
      "name": [
        "Susu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "sux",
      "iso639_2en": "sux",
      "iso639_3": "sux",
      "name": [
        "Sumerian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "syc",
      "iso639_2en": "syc",
      "iso639_3": "syc",
      "name": [
        "Classical Syriac"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "syr",
      "iso639_2en": "syr",
      "iso639_3": "syr",
      "name": [
        "Syriac"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "langCultureMs": [
        {
          "langCultureName": "syr-SY",
          "displayName": "Syriac - Syria",
          "cultureCode": "0x045A"
        }
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "tai",
      "iso639_2en": "tai",
      "iso639_3": "tai",
      "name": [
        "Tai languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tem",
      "iso639_2en": "tem",
      "iso639_3": "tem",
      "name": [
        "Timne"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ter",
      "iso639_2en": "ter",
      "iso639_3": "ter",
      "name": [
        "Tereno"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tet",
      "iso639_2en": "tet",
      "iso639_3": "tet",
      "name": [
        "Tetum"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "TLS"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "tig",
      "iso639_2en": "tig",
      "iso639_3": "tig",
      "name": [
        "Tigre"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tiv",
      "iso639_2en": "tiv",
      "iso639_3": "tiv",
      "name": [
        "Tiv"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tkl",
      "iso639_2en": "tkl",
      "iso639_3": "tkl",
      "name": [
        "Tokelau"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tlh",
      "iso639_2en": "tlh",
      "iso639_3": "tlh",
      "name": [
        "Klingon",
        " tlhIngan-Hol"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tli",
      "iso639_2en": "tli",
      "iso639_3": "tli",
      "name": [
        "Tlingit"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tmh",
      "iso639_2en": "tmh",
      "iso639_3": "tmh",
      "name": [
        "Tamashek"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tog",
      "iso639_2en": "tog",
      "iso639_3": "tog",
      "name": [
        "Tonga (Nyasa)"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tpi",
      "iso639_2en": "tpi",
      "iso639_3": "tpi",
      "name": [
        "Tok Pisin"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "PNG"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "tsi",
      "iso639_2en": "tsi",
      "iso639_3": "tsi",
      "name": [
        "Tsimshian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tum",
      "iso639_2en": "tum",
      "iso639_3": "tum",
      "name": [
        "Tumbuka"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tup",
      "iso639_2en": "tup",
      "iso639_3": "tup",
      "name": [
        "Tupi languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tut",
      "iso639_2en": "tut",
      "iso639_3": "tut",
      "name": [
        "Altaic languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tvl",
      "iso639_2en": "tvl",
      "iso639_3": "tvl",
      "name": [
        "Tuvalu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "tyv",
      "iso639_2en": "tyv",
      "iso639_3": "tyv",
      "name": [
        "Tuvinian"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "udm",
      "iso639_2en": "udm",
      "iso639_3": "udm",
      "name": [
        "Udmurt"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "uga",
      "iso639_2en": "uga",
      "iso639_3": "uga",
      "name": [
        "Ugaritic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "umb",
      "iso639_2en": "umb",
      "iso639_3": "umb",
      "name": [
        "Umbundu"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": "",
      "countries": [
        "AGO"
      ]
    },
    {
      "iso639_1": "",
      "iso639_2": "und",
      "iso639_2en": "und",
      "iso639_3": "und",
      "name": [
        "Undetermined"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "vai",
      "iso639_2en": "vai",
      "iso639_3": "vai",
      "name": [
        "Vai"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "vot",
      "iso639_2en": "vot",
      "iso639_3": "vot",
      "name": [
        "Votic"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "wak",
      "iso639_2en": "wak",
      "iso639_3": "wak",
      "name": [
        "Wakashan languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "wal",
      "iso639_2en": "wal",
      "iso639_3": "wal",
      "name": [
        "Wolaitta",
        " Wolaytta"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "war",
      "iso639_2en": "war",
      "iso639_3": "war",
      "name": [
        "Waray"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "was",
      "iso639_2en": "was",
      "iso639_3": "was",
      "name": [
        "Washo"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "wen",
      "iso639_2en": "wen",
      "iso639_3": "wen",
      "name": [
        "Sorbian languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "xal",
      "iso639_2en": "xal",
      "iso639_3": "xal",
      "name": [
        "Kalmyk",
        " Oirat"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "yao",
      "iso639_2en": "yao",
      "iso639_3": "yao",
      "name": [
        "Yao"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "yap",
      "iso639_2en": "yap",
      "iso639_3": "yap",
      "name": [
        "Yapese"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "ypk",
      "iso639_2en": "ypk",
      "iso639_3": "ypk",
      "name": [
        "Yupik languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zap",
      "iso639_2en": "zap",
      "iso639_3": "zap",
      "name": [
        "Zapotec"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zbl",
      "iso639_2en": "zbl",
      "iso639_3": "zbl",
      "name": [
        "Blissymbols",
        " Blissymbolics",
        " Bliss"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zen",
      "iso639_2en": "zen",
      "iso639_3": "zen",
      "name": [
        "Zenaga"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zgh",
      "iso639_2en": "zgh",
      "iso639_3": "zgh",
      "name": [
        "Standard Moroccan Tamazight"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "znd",
      "iso639_2en": "znd",
      "iso639_3": "znd",
      "name": [
        "Zande languages"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zun",
      "iso639_2en": "zun",
      "iso639_3": "zun",
      "name": [
        "Zuni"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zxx",
      "iso639_2en": "zxx",
      "iso639_3": "zxx",
      "name": [
        "No linguistic content",
        " Not applicable"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    },
    {
      "iso639_1": "",
      "iso639_2": "zza",
      "iso639_2en": "zza",
      "iso639_3": "zza",
      "name": [
        "Zaza",
        " Dimili",
        " Dimli",
        " Kirdki",
        " Kirmanjki",
        " Zazaki"
      ],
      "nativeName": [
        ""
      ],
      "directrion": "LTR",
      "family": ""
    }
  ],
  "countries": [
    {
      "code_2": "AF",
      "code_3": "AFG",
      "numCode": "004",
      "name": "Afghanistan",
      "languages": [
        "prs",
        "pus",
        "fas"
      ]
    },
    {
      "code_2": "AX",
      "code_3": "ALA",
      "numCode": "248",
      "name": "Åland Islands",
      "languages": [
        "swe"
      ]
    },
    {
      "code_2": "AL",
      "code_3": "ALB",
      "numCode": "008",
      "name": "Albania",
      "languages": [
        "sqi"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sq-AL",
          "displayName": "Albanian - Albania",
          "cultureCode": "0x041C"
        }
      ]
    },
    {
      "code_2": "DZ",
      "code_3": "DZA",
      "numCode": "012",
      "name": "Algeria",
      "languages": [
        "ara",
        "ber"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-DZ",
          "displayName": "Arabic - Algeria",
          "cultureCode": "0x1401"
        }
      ]
    },
    {
      "code_2": "AS",
      "code_3": "ASM",
      "numCode": "016",
      "name": "American Samoa"
    },
    {
      "code_2": "AD",
      "code_3": "AND",
      "numCode": "020",
      "name": "Andorra",
      "languages": [
        "cat"
      ]
    },
    {
      "code_2": "AO",
      "code_3": "AGO",
      "numCode": "024",
      "name": "Angola",
      "languages": [
        "kon",
        "kmb",
        "kua",
        "por",
        "umb"
      ]
    },
    {
      "code_2": "AI",
      "code_3": "AIA",
      "numCode": "660",
      "name": "Anguilla"
    },
    {
      "code_2": "AQ",
      "code_3": "ATA",
      "numCode": "010",
      "name": "Antarctica"
    },
    {
      "code_2": "AG",
      "code_3": "ATG",
      "numCode": "028",
      "name": "Antigua and Barbuda",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "AR",
      "code_3": "ARG",
      "numCode": "032",
      "name": "Argentina",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-AR",
          "displayName": "Spanish - Argentina",
          "cultureCode": "0x2C0A"
        }
      ]
    },
    {
      "code_2": "AM",
      "code_3": "ARM",
      "numCode": "051",
      "name": "Armenia",
      "languages": [
        "hye"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hy-AM",
          "displayName": "Armenian - Armenia",
          "cultureCode": "0x042B"
        }
      ]
    },
    {
      "code_2": "AW",
      "code_3": "ABW",
      "numCode": "533",
      "name": "Aruba",
      "languages": [
        "nld",
        "pap"
      ]
    },
    {
      "code_2": "AU",
      "code_3": "AUS",
      "numCode": "036",
      "name": "Australia",
      "languages": [
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-AU",
          "displayName": "English - Australia",
          "cultureCode": "0x0C09"
        }
      ]
    },
    {
      "code_2": "AT",
      "code_3": "AUT",
      "numCode": "040",
      "name": "Austria",
      "languages": [
        "deu"
      ],
      "langCultureMs": [
        {
          "langCultureName": "de-AT",
          "displayName": "German - Austria",
          "cultureCode": "0x0C07"
        }
      ]
    },
    {
      "code_2": "AZ",
      "code_3": "AZE",
      "numCode": "031",
      "name": "Azerbaijan",
      "languages": [
        "aze"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-az-AZ",
          "displayName": "Azeri (Cyrillic) - Azerbaijan",
          "cultureCode": "0x082C"
        },
        {
          "langCultureName": "Lt-az-AZ",
          "displayName": "Azeri (Latin) - Azerbaijan",
          "cultureCode": "0x042C"
        }
      ]
    },
    {
      "code_2": "BS",
      "code_3": "BHS",
      "numCode": "044",
      "name": "Bahamas",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "BH",
      "code_3": "BHR",
      "numCode": "048",
      "name": "Bahrain",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-BH",
          "displayName": "Arabic - Bahrain",
          "cultureCode": "0x3C01"
        }
      ]
    },
    {
      "code_2": "BD",
      "code_3": "BGD",
      "numCode": "050",
      "name": "Bangladesh",
      "languages": [
        "ben"
      ]
    },
    {
      "code_2": "BB",
      "code_3": "BRB",
      "numCode": "052",
      "name": "Barbados",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "BY",
      "code_3": "BLR",
      "numCode": "112",
      "name": "Belarus",
      "languages": [
        "bel",
        "rus"
      ],
      "langCultureMs": [
        {
          "langCultureName": "be-BY",
          "displayName": "Belarusian - Belarus",
          "cultureCode": "0x0423"
        }
      ]
    },
    {
      "code_2": "BE",
      "code_3": "BEL",
      "numCode": "056",
      "name": "Belgium",
      "languages": [
        "nld",
        "fra",
        "deu"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nl-BE",
          "displayName": "Dutch - Belgium",
          "cultureCode": "0x0813"
        },
        {
          "langCultureName": "fr-BE",
          "displayName": "French - Belgium",
          "cultureCode": "0x080C"
        }
      ]
    },
    {
      "code_2": "BZ",
      "code_3": "BLZ",
      "numCode": "084",
      "name": "Belize",
      "languages": [
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-BZ",
          "displayName": "English - Belize",
          "cultureCode": "0x2809"
        }
      ]
    },
    {
      "code_2": "BJ",
      "code_3": "BEN",
      "numCode": "204",
      "name": "Benin",
      "languages": [
        "fra",
        "ful",
        "yor"
      ]
    },
    {
      "code_2": "BM",
      "code_3": "BMU",
      "numCode": "060",
      "name": "Bermuda"
    },
    {
      "code_2": "BT",
      "code_3": "BTN",
      "numCode": "064",
      "name": "Bhutan",
      "languages": [
        "dzo"
      ]
    },
    {
      "code_2": "BO",
      "code_3": "BOL",
      "numCode": "068",
      "name": "Bolivia, Plurinational State of",
      "languages": [
        "aym",
        "grn",
        "que",
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-BO",
          "displayName": "Spanish - Bolivia",
          "cultureCode": "0x400A"
        }
      ]
    },
    {
      "code_2": "BQ",
      "code_3": "BES",
      "numCode": "535",
      "name": "Bonaire, Sint Eustatius and Saba"
    },
    {
      "code_2": "BA",
      "code_3": "BIH",
      "numCode": "070",
      "name": "Bosnia and Herzegovina",
      "languages": [
        "bos",
        "hrv",
        "srp"
      ]
    },
    {
      "code_2": "BW",
      "code_3": "BWA",
      "numCode": "072",
      "name": "Botswana",
      "languages": [
        "eng",
        "tsn"
      ]
    },
    {
      "code_2": "BV",
      "code_3": "BVT",
      "numCode": "074",
      "name": "Bouvet Island"
    },
    {
      "code_2": "BR",
      "code_3": "BRA",
      "numCode": "076",
      "name": "Brazil",
      "languages": [
        "por"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pt-BR",
          "displayName": "Portuguese - Brazil",
          "cultureCode": "0x0416"
        }
      ]
    },
    {
      "code_2": "IO",
      "code_3": "IOT",
      "numCode": "086",
      "name": "British Indian Ocean Territory"
    },
    {
      "code_2": "BN",
      "code_3": "BRN",
      "numCode": "096",
      "name": "Brunei Darussalam",
      "languages": [
        "msa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ms-BN",
          "displayName": "Malay - Brunei",
          "cultureCode": "0x083E"
        }
      ]
    },
    {
      "code_2": "BG",
      "code_3": "BGR",
      "numCode": "100",
      "name": "Bulgaria",
      "languages": [
        "bul"
      ],
      "langCultureMs": [
        {
          "langCultureName": "bg-BG",
          "displayName": "Bulgarian - Bulgaria",
          "cultureCode": "0x0402"
        }
      ]
    },
    {
      "code_2": "BF",
      "code_3": "BFA",
      "numCode": "854",
      "name": "Burkina Faso",
      "languages": [
        "fra",
        "ful",
        "mos"
      ]
    },
    {
      "code_2": "BI",
      "code_3": "BDI",
      "numCode": "108",
      "name": "Burundi",
      "languages": [
        "fra",
        "run"
      ]
    },
    {
      "code_2": "KH",
      "code_3": "KHM",
      "numCode": "116",
      "name": "Cambodia",
      "languages": [
        "khm"
      ]
    },
    {
      "code_2": "CM",
      "code_3": "CMR",
      "numCode": "120",
      "name": "Cameroon",
      "languages": [
        "eng",
        "fra"
      ]
    },
    {
      "code_2": "CA",
      "code_3": "CAN",
      "numCode": "124",
      "name": "Canada",
      "languages": [
        "eng",
        "fra"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-CA",
          "displayName": "English - Canada",
          "cultureCode": "0x1009"
        },
        {
          "langCultureName": "fr-CA",
          "displayName": "French - Canada",
          "cultureCode": "0x0C0C"
        }
      ]
    },
    {
      "code_2": "CV",
      "code_3": "CPV",
      "numCode": "132",
      "name": "Cape Verde",
      "languages": [
        "por"
      ]
    },
    {
      "code_2": "KY",
      "code_3": "CYM",
      "numCode": "136",
      "name": "Cayman Islands"
    },
    {
      "code_2": "CF",
      "code_3": "CAF",
      "numCode": "140",
      "name": "Central African Republic",
      "languages": [
        "fra",
        "sag"
      ]
    },
    {
      "code_2": "TD",
      "code_3": "TCD",
      "numCode": "148",
      "name": "Chad",
      "languages": [
        "ara",
        "fra"
      ]
    },
    {
      "code_2": "CL",
      "code_3": "CHL",
      "numCode": "152",
      "name": "Chile",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-CL",
          "displayName": "Spanish - Chile",
          "cultureCode": "0x340A"
        }
      ]
    },
    {
      "code_2": "CN",
      "code_3": "CHN",
      "numCode": "156",
      "name": "China",
      "languages": [
        "zho"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-CN",
          "displayName": "Chinese - China",
          "cultureCode": "0x0804"
        },
        {
          "langCultureName": "zh-CHS",
          "displayName": "Chinese (Simplified)",
          "cultureCode": "0x0004"
        },
        {
          "langCultureName": "zh-CHT",
          "displayName": "Chinese (Traditional)",
          "cultureCode": "0x7C04"
        }
      ]
    },
    {
      "code_2": "CX",
      "code_3": "CXR",
      "numCode": "162",
      "name": "Christmas Island"
    },
    {
      "code_2": "CC",
      "code_3": "CCK",
      "numCode": "166",
      "name": "Cocos (Keeling) Islands"
    },
    {
      "code_2": "CO",
      "code_3": "COL",
      "numCode": "170",
      "name": "Colombia",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-CO",
          "displayName": "Spanish - Colombia",
          "cultureCode": "0x240A"
        }
      ]
    },
    {
      "code_2": "KM",
      "code_3": "COM",
      "numCode": "174",
      "name": "Comoros",
      "languages": [
        "ara",
        "fra"
      ]
    },
    {
      "code_2": "CG",
      "code_3": "COG",
      "numCode": "178",
      "name": "Congo",
      "languages": [
        "fra",
        "kon",
        "lin"
      ]
    },
    {
      "code_2": "CD",
      "code_3": "COD",
      "numCode": "180",
      "name": "Congo, the Democratic Republic of the",
      "languages": [
        "fra",
        "kon",
        "lin",
        "swa",
        "lub"
      ]
    },
    {
      "code_2": "CK",
      "code_3": "COK",
      "numCode": "184",
      "name": "Cook Islands"
    },
    {
      "code_2": "CR",
      "code_3": "CRI",
      "numCode": "188",
      "name": "Costa Rica",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-CR",
          "displayName": "Spanish - Costa Rica",
          "cultureCode": "0x140A"
        }
      ]
    },
    {
      "code_2": "CI",
      "code_3": "CIV",
      "numCode": "384",
      "name": "Côte d'Ivoire",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "HR",
      "code_3": "HRV",
      "numCode": "191",
      "name": "Croatia",
      "languages": [
        "hrv",
        "ita"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hr-HR",
          "displayName": "Croatian - Croatia",
          "cultureCode": "0x041A"
        }
      ]
    },
    {
      "code_2": "CU",
      "code_3": "CUB",
      "numCode": "192",
      "name": "Cuba",
      "languages": [
        "spa"
      ]
    },
    {
      "code_2": "CW",
      "code_3": "CUW",
      "numCode": "531",
      "name": "Curaçao",
      "languages": [
        "nld",
        "eng",
        "pap"
      ]
    },
    {
      "code_2": "CY",
      "code_3": "CYP",
      "numCode": "196",
      "name": "Cyprus",
      "languages": [
        "ell",
        "tur"
      ]
    },
    {
      "code_2": "CZ",
      "code_3": "CZE",
      "numCode": "203",
      "name": "Czech Republic",
      "languages": [
        "ces",
        "slk"
      ],
      "langCultureMs": [
        {
          "langCultureName": "cs-CZ",
          "displayName": "Czech - Czech Republic",
          "cultureCode": "0x0405"
        }
      ]
    },
    {
      "code_2": "DK",
      "code_3": "DNK",
      "numCode": "208",
      "name": "Denmark",
      "languages": [
        "dan"
      ],
      "langCultureMs": [
        {
          "langCultureName": "da-DK",
          "displayName": "Danish - Denmark",
          "cultureCode": "0x0406"
        }
      ]
    },
    {
      "code_2": "DJ",
      "code_3": "DJI",
      "numCode": "262",
      "name": "Djibouti",
      "languages": [
        "aar",
        "ara",
        "fra",
        "som"
      ]
    },
    {
      "code_2": "DM",
      "code_3": "DMA",
      "numCode": "212",
      "name": "Dominica",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "DO",
      "code_3": "DOM",
      "numCode": "214",
      "name": "Dominican Republic",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-DO",
          "displayName": "Spanish - Dominican Republic",
          "cultureCode": "0x1C0A"
        }
      ]
    },
    {
      "code_2": "EC",
      "code_3": "ECU",
      "numCode": "218",
      "name": "Ecuador",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-EC",
          "displayName": "Spanish - Ecuador",
          "cultureCode": "0x300A"
        }
      ]
    },
    {
      "code_2": "EG",
      "code_3": "EGY",
      "numCode": "818",
      "name": "Egypt",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-EG",
          "displayName": "Arabic - Egypt",
          "cultureCode": "0x0C01"
        }
      ]
    },
    {
      "code_2": "SV",
      "code_3": "SLV",
      "numCode": "222",
      "name": "El Salvador",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-SV",
          "displayName": "Spanish - El Salvador",
          "cultureCode": "0x440A"
        }
      ]
    },
    {
      "code_2": "GQ",
      "code_3": "GNQ",
      "numCode": "226",
      "name": "Equatorial Guinea",
      "languages": [
        "fra",
        "por",
        "spa"
      ]
    },
    {
      "code_2": "ER",
      "code_3": "ERI",
      "numCode": "232",
      "name": "Eritrea",
      "languages": [
        "ara",
        "eng",
        "tir"
      ]
    },
    {
      "code_2": "EE",
      "code_3": "EST",
      "numCode": "233",
      "name": "Estonia",
      "languages": [
        "est"
      ],
      "langCultureMs": [
        {
          "langCultureName": "et-EE",
          "displayName": "Estonian - Estonia",
          "cultureCode": "0x0425"
        }
      ]
    },
    {
      "code_2": "ET",
      "code_3": "ETH",
      "numCode": "231",
      "name": "Ethiopia",
      "languages": [
        "amh"
      ]
    },
    {
      "code_2": "FK",
      "code_3": "FLK",
      "numCode": "238",
      "name": "Falkland Islands (Malvinas)"
    },
    {
      "code_2": "FO",
      "code_3": "FRO",
      "numCode": "234",
      "name": "Faroe Islands",
      "languages": [
        "dan"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fo-FO",
          "displayName": "Faroese - Faroe Islands",
          "cultureCode": "0x0438"
        }
      ]
    },
    {
      "code_2": "FJ",
      "code_3": "FJI",
      "numCode": "242",
      "name": "Fiji",
      "languages": [
        "eng",
        "fij",
        "hin",
        "urd"
      ]
    },
    {
      "code_2": "FI",
      "code_3": "FIN",
      "numCode": "246",
      "name": "Finland",
      "languages": [
        "fin",
        "swe"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fi-FI",
          "displayName": "Finnish - Finland",
          "cultureCode": "0x040B"
        },
        {
          "langCultureName": "sv-FI",
          "displayName": "Swedish - Finland",
          "cultureCode": "0x081D"
        }
      ]
    },
    {
      "code_2": "FR",
      "code_3": "FRA",
      "numCode": "250",
      "name": "France",
      "languages": [
        "fra"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fr-FR",
          "displayName": "French - France",
          "cultureCode": "0x040C"
        }
      ]
    },
    {
      "code_2": "GF",
      "code_3": "GUF",
      "numCode": "254",
      "name": "French Guiana",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "PF",
      "code_3": "PYF",
      "numCode": "258",
      "name": "French Polynesia",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "TF",
      "code_3": "ATF",
      "numCode": "260",
      "name": "French Southern Territories"
    },
    {
      "code_2": "GA",
      "code_3": "GAB",
      "numCode": "266",
      "name": "Gabon",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "GM",
      "code_3": "GMB",
      "numCode": "270",
      "name": "Gambia",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "GE",
      "code_3": "GEO",
      "numCode": "268",
      "name": "Georgia",
      "languages": [
        "kat"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ka-GE",
          "displayName": "Georgian - Georgia",
          "cultureCode": "0x0437"
        }
      ]
    },
    {
      "code_2": "DE",
      "code_3": "DEU",
      "numCode": "276",
      "name": "Germany",
      "languages": [
        "deu"
      ],
      "langCultureMs": [
        {
          "langCultureName": "de-DE",
          "displayName": "German - Germany",
          "cultureCode": "0x0407"
        }
      ]
    },
    {
      "code_2": "GH",
      "code_3": "GHA",
      "numCode": "288",
      "name": "Ghana",
      "languages": [
        "aka",
        "eng",
        "ewe",
        "gaa"
      ]
    },
    {
      "code_2": "GI",
      "code_3": "GIB",
      "numCode": "292",
      "name": "Gibraltar"
    },
    {
      "code_2": "GR",
      "code_3": "GRC",
      "numCode": "300",
      "name": "Greece",
      "languages": [
        "ell"
      ],
      "langCultureMs": [
        {
          "langCultureName": "el-GR",
          "displayName": "Greek - Greece",
          "cultureCode": "0x0408"
        }
      ]
    },
    {
      "code_2": "GL",
      "code_3": "GRL",
      "numCode": "304",
      "name": "Greenland"
    },
    {
      "code_2": "GD",
      "code_3": "GRD",
      "numCode": "308",
      "name": "Grenada",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "GP",
      "code_3": "GLP",
      "numCode": "312",
      "name": "Guadeloupe",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "GU",
      "code_3": "GUM",
      "numCode": "316",
      "name": "Guam"
    },
    {
      "code_2": "GT",
      "code_3": "GTM",
      "numCode": "320",
      "name": "Guatemala",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-GT",
          "displayName": "Spanish - Guatemala",
          "cultureCode": "0x100A"
        }
      ]
    },
    {
      "code_2": "GG",
      "code_3": "GGY",
      "numCode": "831",
      "name": "Guernsey"
    },
    {
      "code_2": "GN",
      "code_3": "GIN",
      "numCode": "324",
      "name": "Guinea",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "GW",
      "code_3": "GNB",
      "numCode": "624",
      "name": "Guinea-Bissau",
      "languages": [
        "por"
      ]
    },
    {
      "code_2": "GY",
      "code_3": "GUY",
      "numCode": "328",
      "name": "Guyana",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "HT",
      "code_3": "HTI",
      "numCode": "332",
      "name": "Haiti",
      "languages": [
        "fra",
        "hat"
      ]
    },
    {
      "code_2": "HM",
      "code_3": "HMD",
      "numCode": "334",
      "name": "Heard Island and McDonald Islands"
    },
    {
      "code_2": "VA",
      "code_3": "VAT",
      "numCode": "336",
      "name": "Holy See (Vatican City State)",
      "languages": [
        "ita",
        "lat"
      ]
    },
    {
      "code_2": "HN",
      "code_3": "HND",
      "numCode": "340",
      "name": "Honduras",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-HN",
          "displayName": "Spanish - Honduras",
          "cultureCode": "0x480A"
        }
      ]
    },
    {
      "code_2": "HK",
      "code_3": "HKG",
      "numCode": "344",
      "name": "Hong Kong",
      "languages": [
        "zho",
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-HK",
          "displayName": "Chinese - Hong Kong SAR",
          "cultureCode": "0x0C04"
        }
      ]
    },
    {
      "code_2": "HU",
      "code_3": "HUN",
      "numCode": "348",
      "name": "Hungary",
      "languages": [
        "hun"
      ],
      "langCultureMs": [
        {
          "langCultureName": "hu-HU",
          "displayName": "Hungarian - Hungary",
          "cultureCode": "0x040E"
        }
      ]
    },
    {
      "code_2": "IS",
      "code_3": "ISL",
      "numCode": "352",
      "name": "Iceland",
      "languages": [
        "isl"
      ],
      "langCultureMs": [
        {
          "langCultureName": "is-IS",
          "displayName": "Icelandic - Iceland",
          "cultureCode": "0x040F"
        }
      ]
    },
    {
      "code_2": "IN",
      "code_3": "IND",
      "numCode": "356",
      "name": "India",
      "languages": [
        "ben",
        "eng",
        "guj",
        "hin",
        "pan",
        "tam",
        "tel"
      ],
      "langCultureMs": [
        {
          "langCultureName": "gu-IN",
          "displayName": "Gujarati - India",
          "cultureCode": "0x0447"
        },
        {
          "langCultureName": "hi-IN",
          "displayName": "Hindi - India",
          "cultureCode": "0x0439"
        },
        {
          "langCultureName": "kn-IN",
          "displayName": "Kannada - India",
          "cultureCode": "0x044B"
        },
        {
          "langCultureName": "kok-IN",
          "displayName": "Konkani - India",
          "cultureCode": "0x0457"
        },
        {
          "langCultureName": "mr-IN",
          "displayName": "Marathi - India",
          "cultureCode": "0x044E"
        },
        {
          "langCultureName": "pa-IN",
          "displayName": "Punjabi - India",
          "cultureCode": "0x0446"
        },
        {
          "langCultureName": "sa-IN",
          "displayName": "Sanskrit - India",
          "cultureCode": "0x044F"
        },
        {
          "langCultureName": "ta-IN",
          "displayName": "Tamil - India",
          "cultureCode": "0x0449"
        },
        {
          "langCultureName": "te-IN",
          "displayName": "Telugu - India",
          "cultureCode": "0x044A"
        }
      ]
    },
    {
      "code_2": "ID",
      "code_3": "IDN",
      "numCode": "360",
      "name": "Indonesia",
      "languages": [
        "ind",
        "msa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "id-ID",
          "displayName": "Indonesian - Indonesia",
          "cultureCode": "0x0421"
        }
      ]
    },
    {
      "code_2": "IR",
      "code_3": "IRN",
      "numCode": "364",
      "name": "Iran, Islamic Republic of",
      "languages": [
        "fas"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fa-IR",
          "displayName": "Farsi - Iran",
          "cultureCode": "0x0429"
        }
      ]
    },
    {
      "code_2": "IQ",
      "code_3": "IRQ",
      "numCode": "368",
      "name": "Iraq",
      "languages": [
        "ara",
        "kur"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-IQ",
          "displayName": "Arabic - Iraq",
          "cultureCode": "0x0801"
        }
      ]
    },
    {
      "code_2": "IE",
      "code_3": "IRL",
      "numCode": "372",
      "name": "Ireland",
      "languages": [
        "eng",
        "gle"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-IE",
          "displayName": "English - Ireland",
          "cultureCode": "0x1809"
        }
      ]
    },
    {
      "code_2": "IM",
      "code_3": "IMN",
      "numCode": "833",
      "name": "Isle of Man"
    },
    {
      "code_2": "IL",
      "code_3": "ISR",
      "numCode": "376",
      "name": "Israel",
      "languages": [
        "ara",
        "heb"
      ],
      "langCultureMs": [
        {
          "langCultureName": "he-IL",
          "displayName": "Hebrew - Israel",
          "cultureCode": "0x040D"
        }
      ]
    },
    {
      "code_2": "IT",
      "code_3": "ITA",
      "numCode": "380",
      "name": "Italy",
      "languages": [
        "fra",
        "deu",
        "ita"
      ],
      "langCultureMs": [
        {
          "langCultureName": "it-IT",
          "displayName": "Italian - Italy",
          "cultureCode": "0x0410"
        }
      ]
    },
    {
      "code_2": "JM",
      "code_3": "JAM",
      "numCode": "388",
      "name": "Jamaica",
      "languages": [
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-JM",
          "displayName": "English - Jamaica",
          "cultureCode": "0x2009"
        }
      ]
    },
    {
      "code_2": "JP",
      "code_3": "JPN",
      "numCode": "392",
      "name": "Japan",
      "languages": [
        "jpn"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ja-JP",
          "displayName": "Japanese - Japan",
          "cultureCode": "0x0411"
        }
      ]
    },
    {
      "code_2": "JE",
      "code_3": "JEY",
      "numCode": "832",
      "name": "Jersey",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "JO",
      "code_3": "JOR",
      "numCode": "400",
      "name": "Jordan",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-JO",
          "displayName": "Arabic - Jordan",
          "cultureCode": "0x2C01"
        }
      ]
    },
    {
      "code_2": "KZ",
      "code_3": "KAZ",
      "numCode": "398",
      "name": "Kazakhstan",
      "languages": [
        "kaz",
        "rus"
      ],
      "langCultureMs": [
        {
          "langCultureName": "kk-KZ",
          "displayName": "Kazakh - Kazakhstan",
          "cultureCode": "0x043F"
        },
        {
          "langCultureName": "ky-KZ",
          "displayName": "Kyrgyz - Kazakhstan",
          "cultureCode": "0x0440"
        }
      ]
    },
    {
      "code_2": "KE",
      "code_3": "KEN",
      "numCode": "404",
      "name": "Kenya",
      "languages": [
        "eng",
        "swa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sw-KE",
          "displayName": "Swahili - Kenya",
          "cultureCode": "0x0441"
        }
      ]
    },
    {
      "code_2": "KI",
      "code_3": "KIR",
      "numCode": "296",
      "name": "Kiribati",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "KP",
      "code_3": "PRK",
      "numCode": "408",
      "name": "Korea, Democratic People's Republic of",
      "languages": [
        "kor"
      ]
    },
    {
      "code_2": "KR",
      "code_3": "KOR",
      "numCode": "410",
      "name": "Korea, Republic of",
      "languages": [
        "kor"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ko-KR",
          "displayName": "Korean - Korea",
          "cultureCode": "0x0412"
        }
      ]
    },
    {
      "code_2": "KW",
      "code_3": "KWT",
      "numCode": "414",
      "name": "Kuwait",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-KW",
          "displayName": "Arabic - Kuwait",
          "cultureCode": "0x3401"
        }
      ]
    },
    {
      "code_2": "KG",
      "code_3": "KGZ",
      "numCode": "417",
      "name": "Kyrgyzstan",
      "languages": [
        "kir",
        "rus"
      ]
    },
    {
      "code_2": "LA",
      "code_3": "LAO",
      "numCode": "418",
      "name": "Lao People's Democratic Republic",
      "languages": [
        "lao"
      ]
    },
    {
      "code_2": "LV",
      "code_3": "LVA",
      "numCode": "428",
      "name": "Latvia",
      "languages": [
        "lav"
      ],
      "langCultureMs": [
        {
          "langCultureName": "lv-LV",
          "displayName": "Latvian - Latvia",
          "cultureCode": "0x0426"
        }
      ]
    },
    {
      "code_2": "LB",
      "code_3": "LBN",
      "numCode": "422",
      "name": "Lebanon",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-LB",
          "displayName": "Arabic - Lebanon",
          "cultureCode": "0x3001"
        }
      ]
    },
    {
      "code_2": "LS",
      "code_3": "LSO",
      "numCode": "426",
      "name": "Lesotho",
      "languages": [
        "eng",
        "sot"
      ]
    },
    {
      "code_2": "LR",
      "code_3": "LBR",
      "numCode": "430",
      "name": "Liberia",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "LY",
      "code_3": "LBY",
      "numCode": "434",
      "name": "Libya",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-LY",
          "displayName": "Arabic - Libya",
          "cultureCode": "0x1001"
        }
      ]
    },
    {
      "code_2": "LI",
      "code_3": "LIE",
      "numCode": "438",
      "name": "Liechtenstein",
      "languages": [
        "deu"
      ],
      "langCultureMs": [
        {
          "langCultureName": "de-LI",
          "displayName": "German - Liechtenstein",
          "cultureCode": "0x1407"
        }
      ]
    },
    {
      "code_2": "LT",
      "code_3": "LTU",
      "numCode": "440",
      "name": "Lithuania",
      "languages": [
        "lit"
      ],
      "langCultureMs": [
        {
          "langCultureName": "lt-LT",
          "displayName": "Lithuanian - Lithuania",
          "cultureCode": "0x0427"
        }
      ]
    },
    {
      "code_2": "LU",
      "code_3": "LUX",
      "numCode": "442",
      "name": "Luxembourg",
      "languages": [
        "fra",
        "deu",
        "ltz"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fr-LU",
          "displayName": "French - Luxembourg",
          "cultureCode": "0x140C"
        },
        {
          "langCultureName": "de-LU",
          "displayName": "German - Luxembourg",
          "cultureCode": "0x1007"
        }
      ]
    },
    {
      "code_2": "MO",
      "code_3": "MAC",
      "numCode": "446",
      "name": "Macao",
      "languages": [
        "zho",
        "por"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-MO",
          "displayName": "Chinese - Macau SAR",
          "cultureCode": "0x1404"
        }
      ]
    },
    {
      "code_2": "MK",
      "code_3": "MKD",
      "numCode": "807",
      "name": "Macedonia, the former Yugoslav Republic of",
      "languages": [
        "mkd"
      ],
      "langCultureMs": [
        {
          "langCultureName": "mk-MK",
          "displayName": "Macedonian (FYROM)",
          "cultureCode": "0x042F"
        }
      ]
    },
    {
      "code_2": "MG",
      "code_3": "MDG",
      "numCode": "450",
      "name": "Madagascar",
      "languages": [
        "fra",
        "mlg"
      ]
    },
    {
      "code_2": "MW",
      "code_3": "MWI",
      "numCode": "454",
      "name": "Malawi",
      "languages": [
        "nya",
        "eng"
      ]
    },
    {
      "code_2": "MY",
      "code_3": "MYS",
      "numCode": "458",
      "name": "Malaysia",
      "languages": [
        "eng",
        "msa",
        "tam"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ms-MY",
          "displayName": "Malay - Malaysia",
          "cultureCode": "0x043E"
        }
      ]
    },
    {
      "code_2": "MV",
      "code_3": "MDV",
      "numCode": "462",
      "name": "Maldives",
      "languages": [
        "div"
      ],
      "langCultureMs": [
        {
          "langCultureName": "div-MV",
          "displayName": "Dhivehi - Maldives",
          "cultureCode": "0x0465"
        }
      ]
    },
    {
      "code_2": "ML",
      "code_3": "MLI",
      "numCode": "466",
      "name": "Mali",
      "languages": [
        "bam",
        "fra",
        "ful",
        "snk"
      ]
    },
    {
      "code_2": "MT",
      "code_3": "MLT",
      "numCode": "470",
      "name": "Malta",
      "languages": [
        "eng",
        "mlt"
      ]
    },
    {
      "code_2": "MH",
      "code_3": "MHL",
      "numCode": "584",
      "name": "Marshall Islands",
      "languages": [
        "eng",
        "mah"
      ]
    },
    {
      "code_2": "MQ",
      "code_3": "MTQ",
      "numCode": "474",
      "name": "Martinique",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "MR",
      "code_3": "MRT",
      "numCode": "478",
      "name": "Mauritania",
      "languages": [
        "ara"
      ]
    },
    {
      "code_2": "MU",
      "code_3": "MUS",
      "numCode": "480",
      "name": "Mauritius",
      "languages": [
        "eng",
        "fra",
        "tam"
      ]
    },
    {
      "code_2": "YT",
      "code_3": "MYT",
      "numCode": "175",
      "name": "Mayotte",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "MX",
      "code_3": "MEX",
      "numCode": "484",
      "name": "Mexico",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-MX",
          "displayName": "Spanish - Mexico",
          "cultureCode": "0x080A"
        }
      ]
    },
    {
      "code_2": "FM",
      "code_3": "FSM",
      "numCode": "583",
      "name": "Micronesia, Federated States of",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "MD",
      "code_3": "MDA",
      "numCode": "498",
      "name": "Moldova, Republic of",
      "languages": [
        "ron"
      ]
    },
    {
      "code_2": "MC",
      "code_3": "MCO",
      "numCode": "492",
      "name": "Monaco",
      "languages": [
        "fra"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fr-MC",
          "displayName": "French - Monaco",
          "cultureCode": "0x180C"
        }
      ]
    },
    {
      "code_2": "MN",
      "code_3": "MNG",
      "numCode": "496",
      "name": "Mongolia",
      "languages": [
        "mon"
      ],
      "langCultureMs": [
        {
          "langCultureName": "mn-MN",
          "displayName": "Mongolian - Mongolia",
          "cultureCode": "0x0450"
        }
      ]
    },
    {
      "code_2": "ME",
      "code_3": "MNE",
      "numCode": "499",
      "name": "Montenegro"
    },
    {
      "code_2": "MS",
      "code_3": "MSR",
      "numCode": "500",
      "name": "Montserrat"
    },
    {
      "code_2": "MA",
      "code_3": "MAR",
      "numCode": "504",
      "name": "Morocco",
      "languages": [
        "ara",
        "ber"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-MA",
          "displayName": "Arabic - Morocco",
          "cultureCode": "0x1801"
        }
      ]
    },
    {
      "code_2": "MZ",
      "code_3": "MOZ",
      "numCode": "508",
      "name": "Mozambique",
      "languages": [
        "por"
      ]
    },
    {
      "code_2": "MM",
      "code_3": "MMR",
      "numCode": "104",
      "name": "Myanmar",
      "languages": [
        "mya"
      ]
    },
    {
      "code_2": "NA",
      "code_3": "NAM",
      "numCode": "516",
      "name": "Namibia",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "NR",
      "code_3": "NRU",
      "numCode": "520",
      "name": "Nauru",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "NP",
      "code_3": "NPL",
      "numCode": "524",
      "name": "Nepal",
      "languages": [
        "nep"
      ]
    },
    {
      "code_2": "NL",
      "code_3": "NLD",
      "numCode": "528",
      "name": "Netherlands",
      "languages": [
        "nld"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nl-NL",
          "displayName": "Dutch - The Netherlands",
          "cultureCode": "0x0413"
        }
      ]
    },
    {
      "code_2": "NC",
      "code_3": "NCL",
      "numCode": "540",
      "name": "New Caledonia",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "NZ",
      "code_3": "NZL",
      "numCode": "554",
      "name": "New Zealand",
      "languages": [
        "eng",
        "mri"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-NZ",
          "displayName": "English - New Zealand",
          "cultureCode": "0x1409"
        }
      ]
    },
    {
      "code_2": "NI",
      "code_3": "NIC",
      "numCode": "558",
      "name": "Nicaragua",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-NI",
          "displayName": "Spanish - Nicaragua",
          "cultureCode": "0x4C0A"
        }
      ]
    },
    {
      "code_2": "NE",
      "code_3": "NER",
      "numCode": "562",
      "name": "Niger",
      "languages": [
        "ara",
        "fra",
        "ful",
        "hau",
        "kau"
      ]
    },
    {
      "code_2": "NG",
      "code_3": "NGA",
      "numCode": "566",
      "name": "Nigeria",
      "languages": [
        "eng",
        "hau",
        "ibo",
        "yor"
      ]
    },
    {
      "code_2": "NU",
      "code_3": "NIU",
      "numCode": "570",
      "name": "Niue"
    },
    {
      "code_2": "NF",
      "code_3": "NFK",
      "numCode": "574",
      "name": "Norfolk Island"
    },
    {
      "code_2": "MP",
      "code_3": "MNP",
      "numCode": "580",
      "name": "Northern Mariana Islands"
    },
    {
      "code_2": "NO",
      "code_3": "NOR",
      "numCode": "578",
      "name": "Norway",
      "languages": [
        "nob",
        "nno",
        "nor"
      ],
      "langCultureMs": [
        {
          "langCultureName": "nb-NO",
          "displayName": "Norwegian (Bokmål) - Norway",
          "cultureCode": "0x0414"
        },
        {
          "langCultureName": "nn-NO",
          "displayName": "Norwegian (Nynorsk) - Norway",
          "cultureCode": "0x0814"
        }
      ]
    },
    {
      "code_2": "OM",
      "code_3": "OMN",
      "numCode": "512",
      "name": "Oman",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-OM",
          "displayName": "Arabic - Oman",
          "cultureCode": "0x2001"
        }
      ]
    },
    {
      "code_2": "PK",
      "code_3": "PAK",
      "numCode": "586",
      "name": "Pakistan",
      "languages": [
        "eng",
        "urd"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ur-PK",
          "displayName": "Urdu - Pakistan",
          "cultureCode": "0x0420"
        }
      ]
    },
    {
      "code_2": "PW",
      "code_3": "PLW",
      "numCode": "585",
      "name": "Palau",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "PS",
      "code_3": "PSE",
      "numCode": "275",
      "name": "Palestine, State of"
    },
    {
      "code_2": "PA",
      "code_3": "PAN",
      "numCode": "591",
      "name": "Panama",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-PA",
          "displayName": "Spanish - Panama",
          "cultureCode": "0x180A"
        }
      ]
    },
    {
      "code_2": "PG",
      "code_3": "PNG",
      "numCode": "598",
      "name": "Papua New Guinea",
      "languages": [
        "eng",
        "hmo",
        "tpi"
      ]
    },
    {
      "code_2": "PY",
      "code_3": "PRY",
      "numCode": "600",
      "name": "Paraguay",
      "languages": [
        "grn",
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-PY",
          "displayName": "Spanish - Paraguay",
          "cultureCode": "0x3C0A"
        }
      ]
    },
    {
      "code_2": "PE",
      "code_3": "PER",
      "numCode": "604",
      "name": "Peru",
      "languages": [
        "aym",
        "que",
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-PE",
          "displayName": "Spanish - Peru",
          "cultureCode": "0x280A"
        }
      ]
    },
    {
      "code_2": "PH",
      "code_3": "PHL",
      "numCode": "608",
      "name": "Philippines",
      "languages": [
        "eng",
        "fil",
        "tgl"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-PH",
          "displayName": "English - Philippines",
          "cultureCode": "0x3409"
        }
      ]
    },
    {
      "code_2": "PN",
      "code_3": "PCN",
      "numCode": "612",
      "name": "Pitcairn"
    },
    {
      "code_2": "PL",
      "code_3": "POL",
      "numCode": "616",
      "name": "Poland",
      "languages": [
        "pol"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pl-PL",
          "displayName": "Polish - Poland",
          "cultureCode": "0x0415"
        }
      ]
    },
    {
      "code_2": "PT",
      "code_3": "PRT",
      "numCode": "620",
      "name": "Portugal",
      "languages": [
        "por"
      ],
      "langCultureMs": [
        {
          "langCultureName": "pt-PT",
          "displayName": "Portuguese - Portugal",
          "cultureCode": "0x0816"
        }
      ]
    },
    {
      "code_2": "PR",
      "code_3": "PRI",
      "numCode": "630",
      "name": "Puerto Rico",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-PR",
          "displayName": "Spanish - Puerto Rico",
          "cultureCode": "0x500A"
        }
      ]
    },
    {
      "code_2": "QA",
      "code_3": "QAT",
      "numCode": "634",
      "name": "Qatar",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-QA",
          "displayName": "Arabic - Qatar",
          "cultureCode": "0x4001"
        }
      ]
    },
    {
      "code_2": "RE",
      "code_3": "REU",
      "numCode": "638",
      "name": "Réunion",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "RO",
      "code_3": "ROU",
      "numCode": "642",
      "name": "Romania",
      "languages": [
        "ron"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ro-RO",
          "displayName": "Romanian - Romania",
          "cultureCode": "0x0418"
        }
      ]
    },
    {
      "code_2": "RU",
      "code_3": "RUS",
      "numCode": "643",
      "name": "Russian Federation",
      "languages": [
        "rus"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ru-RU",
          "displayName": "Russian - Russia",
          "cultureCode": "0x0419"
        },
        {
          "langCultureName": "tt-RU",
          "displayName": "Tatar - Russia",
          "cultureCode": "0x0444"
        }
      ]
    },
    {
      "code_2": "RW",
      "code_3": "RWA",
      "numCode": "646",
      "name": "Rwanda",
      "languages": [
        "eng",
        "fra",
        "kin"
      ]
    },
    {
      "code_2": "BL",
      "code_3": "BLM",
      "numCode": "652",
      "name": "Saint Barthélemy",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "SH",
      "code_3": "SHN",
      "numCode": "654",
      "name": "Saint Helena, Ascension and Tristan da Cunha"
    },
    {
      "code_2": "KN",
      "code_3": "KNA",
      "numCode": "659",
      "name": "Saint Kitts and Nevis",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "LC",
      "code_3": "LCA",
      "numCode": "662",
      "name": "Saint Lucia",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "MF",
      "code_3": "MAF",
      "numCode": "663",
      "name": "Saint Martin (French part)"
    },
    {
      "code_2": "PM",
      "code_3": "SPM",
      "numCode": "666",
      "name": "Saint Pierre and Miquelon",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "VC",
      "code_3": "VCT",
      "numCode": "670",
      "name": "Saint Vincent and the Grenadines",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "WS",
      "code_3": "WSM",
      "numCode": "882",
      "name": "Samoa",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "SM",
      "code_3": "SMR",
      "numCode": "674",
      "name": "San Marino",
      "languages": [
        "ita"
      ]
    },
    {
      "code_2": "ST",
      "code_3": "STP",
      "numCode": "678",
      "name": "Sao Tome and Principe",
      "languages": [
        "por"
      ]
    },
    {
      "code_2": "SA",
      "code_3": "SAU",
      "numCode": "682",
      "name": "Saudi Arabia",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-SA",
          "displayName": "Arabic - Saudi Arabia",
          "cultureCode": "0x0401"
        }
      ]
    },
    {
      "code_2": "SN",
      "code_3": "SEN",
      "numCode": "686",
      "name": "Senegal",
      "languages": [
        "fra",
        "ful",
        "srr",
        "snk",
        "wol"
      ]
    },
    {
      "code_2": "RS",
      "code_3": "SRB",
      "numCode": "688",
      "name": "Serbia",
      "languages": [
        "srp"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-sr-SP",
          "displayName": "Serbian (Cyrillic) - Serbia",
          "cultureCode": "0x0C1A"
        },
        {
          "langCultureName": "Lt-sr-SP",
          "displayName": "Serbian (Latin) - Serbia",
          "cultureCode": "0x081A"
        }
      ]
    },
    {
      "code_2": "SC",
      "code_3": "SYC",
      "numCode": "690",
      "name": "Seychelles",
      "languages": [
        "eng",
        "fra"
      ]
    },
    {
      "code_2": "SL",
      "code_3": "SLE",
      "numCode": "694",
      "name": "Sierra Leone",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "SG",
      "code_3": "SGP",
      "numCode": "702",
      "name": "Singapore",
      "languages": [
        "zho",
        "eng",
        "msa",
        "tam"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-SG",
          "displayName": "Chinese - Singapore",
          "cultureCode": "0x1004"
        }
      ]
    },
    {
      "code_2": "SX",
      "code_3": "SXM",
      "numCode": "534",
      "name": "Sint Maarten (Dutch part)",
      "languages": [
        "nld",
        "eng"
      ]
    },
    {
      "code_2": "SK",
      "code_3": "SVK",
      "numCode": "703",
      "name": "Slovakia",
      "languages": [
        "ces",
        "slk"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sk-SK",
          "displayName": "Slovak - Slovakia",
          "cultureCode": "0x041B"
        }
      ]
    },
    {
      "code_2": "SI",
      "code_3": "SVN",
      "numCode": "705",
      "name": "Slovenia",
      "languages": [
        "ita",
        "slv"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sl-SI",
          "displayName": "Slovenian - Slovenia",
          "cultureCode": "0x0424"
        }
      ]
    },
    {
      "code_2": "SB",
      "code_3": "SLB",
      "numCode": "090",
      "name": "Solomon Islands",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "SO",
      "code_3": "SOM",
      "numCode": "706",
      "name": "Somalia",
      "languages": [
        "ara",
        "som"
      ]
    },
    {
      "code_2": "ZA",
      "code_3": "ZAF",
      "numCode": "710",
      "name": "South Africa",
      "languages": [
        "afr",
        "eng",
        "nde",
        "nbl",
        "nso",
        "sot",
        "ssw",
        "tso",
        "tsn",
        "ven",
        "xho",
        "zul"
      ],
      "langCultureMs": [
        {
          "langCultureName": "af-ZA",
          "displayName": "Afrikaans - South Africa",
          "cultureCode": "0x0436"
        },
        {
          "langCultureName": "en-ZA",
          "displayName": "English - South Africa",
          "cultureCode": "0x1C09"
        }
      ]
    },
    {
      "code_2": "GS",
      "code_3": "SGS",
      "numCode": "239",
      "name": "South Georgia and the South Sandwich Islands"
    },
    {
      "code_2": "SS",
      "code_3": "SSD",
      "numCode": "728",
      "name": "South Sudan",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "ES",
      "code_3": "ESP",
      "numCode": "724",
      "name": "Spain",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "eu-ES",
          "displayName": "Basque - Basque",
          "cultureCode": "0x042D"
        },
        {
          "langCultureName": "ca-ES",
          "displayName": "Catalan - Catalan",
          "cultureCode": "0x0403"
        },
        {
          "langCultureName": "gl-ES",
          "displayName": "Galician - Galician",
          "cultureCode": "0x0456"
        },
        {
          "langCultureName": "es-ES",
          "displayName": "Spanish - Spain",
          "cultureCode": "0x0C0A"
        }
      ]
    },
    {
      "code_2": "LK",
      "code_3": "LKA",
      "numCode": "144",
      "name": "Sri Lanka",
      "languages": [
        "eng",
        "sin",
        "tam"
      ]
    },
    {
      "code_2": "SD",
      "code_3": "SDN",
      "numCode": "729",
      "name": "Sudan",
      "languages": [
        "ara",
        "eng"
      ]
    },
    {
      "code_2": "SR",
      "code_3": "SUR",
      "numCode": "740",
      "name": "Suriname",
      "languages": [
        "nld"
      ]
    },
    {
      "code_2": "SJ",
      "code_3": "SJM",
      "numCode": "744",
      "name": "Svalbard and Jan Mayen"
    },
    {
      "code_2": "SZ",
      "code_3": "SWZ",
      "numCode": "748",
      "name": "Swaziland",
      "languages": [
        "eng",
        "ssw"
      ]
    },
    {
      "code_2": "SE",
      "code_3": "SWE",
      "numCode": "752",
      "name": "Sweden",
      "languages": [
        "swe"
      ],
      "langCultureMs": [
        {
          "langCultureName": "sv-SE",
          "displayName": "Swedish - Sweden",
          "cultureCode": "0x041D"
        }
      ]
    },
    {
      "code_2": "CH",
      "code_3": "CHE",
      "numCode": "756",
      "name": "Switzerland",
      "languages": [
        "fra",
        "deu",
        "ita",
        "roh"
      ],
      "langCultureMs": [
        {
          "langCultureName": "fr-CH",
          "displayName": "French - Switzerland",
          "cultureCode": "0x100C"
        },
        {
          "langCultureName": "de-CH",
          "displayName": "German - Switzerland",
          "cultureCode": "0x0807"
        },
        {
          "langCultureName": "it-CH",
          "displayName": "Italian - Switzerland",
          "cultureCode": "0x0810"
        }
      ]
    },
    {
      "code_2": "SY",
      "code_3": "SYR",
      "numCode": "760",
      "name": "Syrian Arab Republic",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-SY",
          "displayName": "Arabic - Syria",
          "cultureCode": "0x2801"
        },
        {
          "langCultureName": "syr-SY",
          "displayName": "Syriac - Syria",
          "cultureCode": "0x045A"
        }
      ]
    },
    {
      "code_2": "TW",
      "code_3": "TWN",
      "numCode": "158",
      "name": "Taiwan, Province of China",
      "languages": [
        "zho"
      ],
      "langCultureMs": [
        {
          "langCultureName": "zh-TW",
          "displayName": "Chinese - Taiwan",
          "cultureCode": "0x0404"
        }
      ]
    },
    {
      "code_2": "TJ",
      "code_3": "TJK",
      "numCode": "762",
      "name": "Tajikistan",
      "languages": [
        "fas",
        "rus",
        "tgk"
      ]
    },
    {
      "code_2": "TZ",
      "code_3": "TZA",
      "numCode": "834",
      "name": "Tanzania, United Republic of",
      "languages": [
        "eng",
        "swa"
      ]
    },
    {
      "code_2": "TH",
      "code_3": "THA",
      "numCode": "764",
      "name": "Thailand",
      "languages": [
        "tha"
      ],
      "langCultureMs": [
        {
          "langCultureName": "th-TH",
          "displayName": "Thai - Thailand",
          "cultureCode": "0x041E"
        }
      ]
    },
    {
      "code_2": "TL",
      "code_3": "TLS",
      "numCode": "626",
      "name": "Timor-Leste",
      "languages": [
        "por",
        "tet"
      ]
    },
    {
      "code_2": "TG",
      "code_3": "TGO",
      "numCode": "768",
      "name": "Togo",
      "languages": [
        "ewe",
        "fra"
      ]
    },
    {
      "code_2": "TK",
      "code_3": "TKL",
      "numCode": "772",
      "name": "Tokelau"
    },
    {
      "code_2": "TO",
      "code_3": "TON",
      "numCode": "776",
      "name": "Tonga",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "TT",
      "code_3": "TTO",
      "numCode": "780",
      "name": "Trinidad and Tobago",
      "languages": [
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-TT",
          "displayName": "English - Trinidad and Tobago",
          "cultureCode": "0x2C09"
        }
      ]
    },
    {
      "code_2": "TN",
      "code_3": "TUN",
      "numCode": "788",
      "name": "Tunisia",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-TN",
          "displayName": "Arabic - Tunisia",
          "cultureCode": "0x1C01"
        }
      ]
    },
    {
      "code_2": "TR",
      "code_3": "TUR",
      "numCode": "792",
      "name": "Turkey",
      "languages": [
        "tur"
      ],
      "langCultureMs": [
        {
          "langCultureName": "tr-TR",
          "displayName": "Turkish - Turkey",
          "cultureCode": "0x041F"
        }
      ]
    },
    {
      "code_2": "TM",
      "code_3": "TKM",
      "numCode": "795",
      "name": "Turkmenistan",
      "languages": [
        "tuk"
      ]
    },
    {
      "code_2": "TC",
      "code_3": "TCA",
      "numCode": "796",
      "name": "Turks and Caicos Islands"
    },
    {
      "code_2": "TV",
      "code_3": "TUV",
      "numCode": "798",
      "name": "Tuvalu",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "UG",
      "code_3": "UGA",
      "numCode": "800",
      "name": "Uganda",
      "languages": [
        "eng",
        "swa"
      ]
    },
    {
      "code_2": "UA",
      "code_3": "UKR",
      "numCode": "804",
      "name": "Ukraine",
      "languages": [
        "ukr"
      ],
      "langCultureMs": [
        {
          "langCultureName": "uk-UA",
          "displayName": "Ukrainian - Ukraine",
          "cultureCode": "0x0422"
        }
      ]
    },
    {
      "code_2": "AE",
      "code_3": "ARE",
      "numCode": "784",
      "name": "United Arab Emirates",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-AE",
          "displayName": "Arabic - United Arab Emirates",
          "cultureCode": "0x3801"
        }
      ]
    },
    {
      "code_2": "GB",
      "code_3": "GBR",
      "numCode": "826",
      "name": "United Kingdom",
      "languages": [
        "eng",
        "cym"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-GB",
          "displayName": "English - United Kingdom",
          "cultureCode": "0x0809"
        }
      ]
    },
    {
      "code_2": "US",
      "code_3": "USA",
      "numCode": "840",
      "name": "United States",
      "languages": [
        "eng"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-US",
          "displayName": "English - United States",
          "cultureCode": "0x0409"
        }
      ]
    },
    {
      "code_2": "UM",
      "code_3": "UMI",
      "numCode": "581",
      "name": "United States Minor Outlying Islands"
    },
    {
      "code_2": "UY",
      "code_3": "URY",
      "numCode": "858",
      "name": "Uruguay",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-UY",
          "displayName": "Spanish - Uruguay",
          "cultureCode": "0x380A"
        }
      ]
    },
    {
      "code_2": "UZ",
      "code_3": "UZB",
      "numCode": "860",
      "name": "Uzbekistan",
      "languages": [
        "uzb"
      ],
      "langCultureMs": [
        {
          "langCultureName": "Cy-uz-UZ",
          "displayName": "Uzbek (Cyrillic) - Uzbekistan",
          "cultureCode": "0x0843"
        },
        {
          "langCultureName": "Lt-uz-UZ",
          "displayName": "Uzbek (Latin) - Uzbekistan",
          "cultureCode": "0x0443"
        }
      ]
    },
    {
      "code_2": "VU",
      "code_3": "VUT",
      "numCode": "548",
      "name": "Vanuatu",
      "languages": [
        "bis",
        "eng",
        "fra"
      ]
    },
    {
      "code_2": "VE",
      "code_3": "VEN",
      "numCode": "862",
      "name": "Venezuela, Bolivarian Republic of",
      "languages": [
        "spa"
      ],
      "langCultureMs": [
        {
          "langCultureName": "es-VE",
          "displayName": "Spanish - Venezuela",
          "cultureCode": "0x200A"
        }
      ]
    },
    {
      "code_2": "VN",
      "code_3": "VNM",
      "numCode": "704",
      "name": "Viet Nam",
      "languages": [
        "vie"
      ],
      "langCultureMs": [
        {
          "langCultureName": "vi-VN",
          "displayName": "Vietnamese - Vietnam",
          "cultureCode": "0x042A"
        }
      ]
    },
    {
      "code_2": "VG",
      "code_3": "VGB",
      "numCode": "092",
      "name": "Virgin Islands, British"
    },
    {
      "code_2": "VI",
      "code_3": "VIR",
      "numCode": "850",
      "name": "Virgin Islands, U.S."
    },
    {
      "code_2": "WF",
      "code_3": "WLF",
      "numCode": "876",
      "name": "Wallis and Futuna",
      "languages": [
        "fra"
      ]
    },
    {
      "code_2": "EH",
      "code_3": "ESH",
      "numCode": "732",
      "name": "Western Sahara",
      "languages": [
        "spa"
      ]
    },
    {
      "code_2": "YE",
      "code_3": "YEM",
      "numCode": "887",
      "name": "Yemen",
      "languages": [
        "ara"
      ],
      "langCultureMs": [
        {
          "langCultureName": "ar-YE",
          "displayName": "Arabic - Yemen",
          "cultureCode": "0x2401"
        }
      ]
    },
    {
      "code_2": "ZM",
      "code_3": "ZMB",
      "numCode": "894",
      "name": "Zambia",
      "languages": [
        "eng"
      ]
    },
    {
      "code_2": "ZW",
      "code_3": "ZWE",
      "numCode": "716",
      "name": "Zimbabwe",
      "languages": [
        "eng",
        "nde",
        "sna"
      ],
      "langCultureMs": [
        {
          "langCultureName": "en-ZW",
          "displayName": "English - Zimbabwe",
          "cultureCode": "0x3009"
        }
      ]
    }
  ],
  "locales": [
    [
      "af",
      "ZA"
    ],
    [
      "am",
      "ET"
    ],
    [
      "ar",
      "AE"
    ],
    [
      "ar",
      "BH"
    ],
    [
      "ar",
      "DZ"
    ],
    [
      "ar",
      "EG"
    ],
    [
      "ar",
      "IQ"
    ],
    [
      "ar",
      "JO"
    ],
    [
      "ar",
      "KW"
    ],
    [
      "ar",
      "LB"
    ],
    [
      "ar",
      "LY"
    ],
    [
      "ar",
      "MA"
    ],
    [
      "arn",
      "CL"
    ],
    [
      "ar",
      "OM"
    ],
    [
      "ar",
      "QA"
    ],
    [
      "ar",
      "SA"
    ],
    [
      "ar",
      "SY"
    ],
    [
      "ar",
      "TN"
    ],
    [
      "ar",
      "YE"
    ],
    [
      "as",
      "IN"
    ],
    [
      "az",
      "Cyrl",
      "AZ"
    ],
    [
      "az",
      "Latn",
      "AZ"
    ],
    [
      "ba",
      "RU"
    ],
    [
      "be",
      "BY"
    ],
    [
      "bg",
      "BG"
    ],
    [
      "bn",
      "BD"
    ],
    [
      "bn",
      "IN"
    ],
    [
      "bo",
      "CN"
    ],
    [
      "br",
      "FR"
    ],
    [
      "bs",
      "Cyrl",
      "BA"
    ],
    [
      "bs",
      "Latn",
      "BA"
    ],
    [
      "ca",
      "ES"
    ],
    [
      "co",
      "FR"
    ],
    [
      "cs",
      "CZ"
    ],
    [
      "cy",
      "GB"
    ],
    [
      "da",
      "DK"
    ],
    [
      "de",
      "AT"
    ],
    [
      "de",
      "CH"
    ],
    [
      "de",
      "DE"
    ],
    [
      "de",
      "LI"
    ],
    [
      "de",
      "LU"
    ],
    [
      "dsb",
      "DE"
    ],
    [
      "dv",
      "MV"
    ],
    [
      "el",
      "GR"
    ],
    [
      "en",
      "029"
    ],
    [
      "en",
      "AU"
    ],
    [
      "en",
      "BZ"
    ],
    [
      "en",
      "CA"
    ],
    [
      "en",
      "GB"
    ],
    [
      "en",
      "IE"
    ],
    [
      "en",
      "IN"
    ],
    [
      "en",
      "JM"
    ],
    [
      "en",
      "MY"
    ],
    [
      "en",
      "NZ"
    ],
    [
      "en",
      "PH"
    ],
    [
      "en",
      "SG"
    ],
    [
      "en",
      "TT"
    ],
    [
      "en",
      "US"
    ],
    [
      "en",
      "ZA"
    ],
    [
      "en",
      "ZW"
    ],
    [
      "es",
      "AR"
    ],
    [
      "es",
      "BO"
    ],
    [
      "es",
      "CL"
    ],
    [
      "es",
      "CO"
    ],
    [
      "es",
      "CR"
    ],
    [
      "es",
      "DO"
    ],
    [
      "es",
      "EC"
    ],
    [
      "es",
      "ES"
    ],
    [
      "es",
      "GT"
    ],
    [
      "es",
      "HN"
    ],
    [
      "es",
      "MX"
    ],
    [
      "es",
      "NI"
    ],
    [
      "es",
      "PA"
    ],
    [
      "es",
      "PE"
    ],
    [
      "es",
      "PR"
    ],
    [
      "es",
      "PY"
    ],
    [
      "es",
      "SV"
    ],
    [
      "es",
      "US"
    ],
    [
      "es",
      "UY"
    ],
    [
      "es",
      "VE"
    ],
    [
      "et",
      "EE"
    ],
    [
      "eu",
      "ES"
    ],
    [
      "fa",
      "IR"
    ],
    [
      "fi",
      "FI"
    ],
    [
      "fil",
      "PH"
    ],
    [
      "fo",
      "FO"
    ],
    [
      "fr",
      "BE"
    ],
    [
      "fr",
      "CA"
    ],
    [
      "fr",
      "CH"
    ],
    [
      "fr",
      "FR"
    ],
    [
      "fr",
      "LU"
    ],
    [
      "fr",
      "MC"
    ],
    [
      "fy",
      "NL"
    ],
    [
      "ga",
      "IE"
    ],
    [
      "gd",
      "GB"
    ],
    [
      "gl",
      "ES"
    ],
    [
      "gsw",
      "FR"
    ],
    [
      "gu",
      "IN"
    ],
    [
      "ha",
      "Latn",
      "NG"
    ],
    [
      "he",
      "IL"
    ],
    [
      "hi",
      "IN"
    ],
    [
      "hr",
      "BA"
    ],
    [
      "hr",
      "HR"
    ],
    [
      "hsb",
      "DE"
    ],
    [
      "hu",
      "HU"
    ],
    [
      "hy",
      "AM"
    ],
    [
      "id",
      "ID"
    ],
    [
      "ig",
      "NG"
    ],
    [
      "ii",
      "CN"
    ],
    [
      "is",
      "IS"
    ],
    [
      "it",
      "CH"
    ],
    [
      "it",
      "IT"
    ],
    [
      "iu",
      "Cans",
      "CA"
    ],
    [
      "iu",
      "Latn",
      "CA"
    ],
    [
      "ja",
      "JP"
    ],
    [
      "ka",
      "GE"
    ],
    [
      "kk",
      "KZ"
    ],
    [
      "kl",
      "GL"
    ],
    [
      "km",
      "KH"
    ],
    [
      "kn",
      "IN"
    ],
    [
      "kok",
      "IN"
    ],
    [
      "ko",
      "KR"
    ],
    [
      "ky",
      "KG"
    ],
    [
      "lb",
      "LU"
    ],
    [
      "lo",
      "LA"
    ],
    [
      "lt",
      "LT"
    ],
    [
      "lv",
      "LV"
    ],
    [
      "mi",
      "NZ"
    ],
    [
      "mk",
      "MK"
    ],
    [
      "ml",
      "IN"
    ],
    [
      "mn",
      "MN"
    ],
    [
      "mn",
      "Mong",
      "CN"
    ],
    [
      "moh",
      "CA"
    ],
    [
      "mr",
      "IN"
    ],
    [
      "ms",
      "BN"
    ],
    [
      "ms",
      "MY"
    ],
    [
      "mt",
      "MT"
    ],
    [
      "nb",
      "NO"
    ],
    [
      "ne",
      "NP"
    ],
    [
      "nl",
      "BE"
    ],
    [
      "nl",
      "NL"
    ],
    [
      "nn",
      "NO"
    ],
    [
      "nso",
      "ZA"
    ],
    [
      "oc",
      "FR"
    ],
    [
      "or",
      "IN"
    ],
    [
      "pa",
      "IN"
    ],
    [
      "pl",
      "PL"
    ],
    [
      "prs",
      "AF"
    ],
    [
      "ps",
      "AF"
    ],
    [
      "pt",
      "BR"
    ],
    [
      "pt",
      "PT"
    ],
    [
      "qut",
      "GT"
    ],
    [
      "quz",
      "BO"
    ],
    [
      "quz",
      "EC"
    ],
    [
      "quz",
      "PE"
    ],
    [
      "rm",
      "CH"
    ],
    [
      "ro",
      "RO"
    ],
    [
      "ru",
      "RU"
    ],
    [
      "rw",
      "RW"
    ],
    [
      "sah",
      "RU"
    ],
    [
      "sa",
      "IN"
    ],
    [
      "se",
      "FI"
    ],
    [
      "se",
      "NO"
    ],
    [
      "se",
      "SE"
    ],
    [
      "si",
      "LK"
    ],
    [
      "sk",
      "SK"
    ],
    [
      "sl",
      "SI"
    ],
    [
      "sma",
      "NO"
    ],
    [
      "sma",
      "SE"
    ],
    [
      "smj",
      "NO"
    ],
    [
      "smj",
      "SE"
    ],
    [
      "smn",
      "FI"
    ],
    [
      "sms",
      "FI"
    ],
    [
      "sq",
      "AL"
    ],
    [
      "sr",
      "Cyrl",
      "BA"
    ],
    [
      "sr",
      "Cyrl",
      "CS"
    ],
    [
      "sr",
      "Cyrl",
      "ME"
    ],
    [
      "sr",
      "Cyrl",
      "RS"
    ],
    [
      "sr",
      "Latn",
      "BA"
    ],
    [
      "sr",
      "Latn",
      "CS"
    ],
    [
      "sr",
      "Latn",
      "ME"
    ],
    [
      "sr",
      "Latn",
      "RS"
    ],
    [
      "sv",
      "FI"
    ],
    [
      "sv",
      "SE"
    ],
    [
      "sw",
      "KE"
    ],
    [
      "syr",
      "SY"
    ],
    [
      "ta",
      "IN"
    ],
    [
      "te",
      "IN"
    ],
    [
      "tg",
      "Cyrl",
      "TJ"
    ],
    [
      "th",
      "TH"
    ],
    [
      "tk",
      "TM"
    ],
    [
      "tn",
      "ZA"
    ],
    [
      "tr",
      "TR"
    ],
    [
      "tt",
      "RU"
    ],
    [
      "tzm",
      "Latn",
      "DZ"
    ],
    [
      "ug",
      "CN"
    ],
    [
      "uk",
      "UA"
    ],
    [
      "ur",
      "PK"
    ],
    [
      "uz",
      "Cyrl",
      "UZ"
    ],
    [
      "uz",
      "Latn",
      "UZ"
    ],
    [
      "vi",
      "VN"
    ],
    [
      "wo",
      "SN"
    ],
    [
      "xh",
      "ZA"
    ],
    [
      "yo",
      "NG"
    ],
    [
      "zh",
      "CN"
    ],
    [
      "zh",
      "HK"
    ],
    [
      "zh",
      "MO"
    ],
    [
      "zh",
      "SG"
    ],
    [
      "zh",
      "TW"
    ],
    [
      "zu",
      "ZA"
    ]
  ]
}
},{}],3:[function(require,module,exports){
var _ = require('underscore')
  , _d = require('underscore.deep')
  , utils = require('./utils')
  , data = require('./data.json');

_.mixin(_d);

var noop = function(err, value) {
  if (err) return err;
  return value;
};

exports.getCountries = function () {
  return data.countries;
};

exports.getLanguages = function () {
  return data.languages;
};

exports.getLanguageFamilies = function () {
  return data.languageFamilies;
};

exports.getLanguageCodes = function (codeType, cb) {
  var languages = data.languages
    , cType
    , cTypeNames = [ 'iso639_1', 'iso639_2en', 'iso639_3']
    , codes = [];

  cb = cb || utils.isFunction(codeType) ? codeType : noop;

  codeType = (codeType && !utils.isFunction(codeType)) ? codeType : 1;
  codeType = Math.floor(Number(codeType));
  if (isNaN(codeType) || codeType < 1 || codeType > cTypeNames.length) {
    return cb('Wrong language code type provided. Valid values: 1, 2, 3 for iso639-1, iso639-2, iso639-3 respectively');
  }
  cType = cTypeNames[codeType - 1];
  _.each(languages, function (language) {
    if (language[cType]) codes.push(language[cType]);
  });

  return cb(null, codes);
};

exports.getCountryCodes = function (codeType, cb) {
  var countries = data.countries
    , cType
    , cTypeNames = [ 'numCode', 'code_2', 'code_3' ]
    , codes = [];

  cb = cb || utils.isFunction(codeType) ? codeType : noop;

  codeType = (codeType && !utils.isFunction(codeType)) ? codeType : 2;
  codeType = Math.floor(Number(codeType));
  if (isNaN(codeType) || codeType < 1 || codeType > cTypeNames.length) {
    return cb('Wrong country code type provided. Valid values: 1, 2, 3 for numeric code, alpha-2, alpha-3 respectively');
  }
  cType = cTypeNames[codeType - 1];
  _.each(countries, function (country) {
    if (country[cType]) codes.push(country[cType]);
  });

  return cb(null, codes);
};

exports.languageCodeExists = function (code) {
  var codes
    , exists;

  if (!code) return false;
  code = code.toLowerCase();
  for (var i = 1; i < 4; i++) {
    codes = exports.getLanguageCodes(i);
    exists = _.indexOf(codes, code) != -1;
    if (exists) break;
  }

  return exists;
};

exports.countryCodeExists = function (code) {
  var codes
    , exists;

  if (!code) return false;
  code = code.toUpperCase();
  for (var i = 1; i < 4; i++) {
    codes = exports.getCountryCodes(i);
    exists = _.indexOf(codes, code) != -1;
    if (exists) break;
  }

  return exists;
};

exports.getCountry  = function (code, cb, noLangInfo) {
  var countries = data.countries
    , country
    , codeFld
    , langs;

  if ('string' !== typeof code) {
    return cb('No country code provided');
  }
  cb = cb || noop;
  code = code.toUpperCase();

  if (code.length == 2) {
    codeFld = 'code_2';
  } else if (code.length == 3) {
    codeFld = 'code_3';
  }

  if (codeFld) {
    country = _.find(countries, function (c) {
      return c[codeFld] == code;
    });
    if (!country) {
      return cb('There is no country with code "' + code + '"');
    }
    country = _.deepClone(country);
    if (!noLangInfo) {
      langs = country.languages;
      country.languages = [];
      _.each(langs, function (l) {
        country.languages.push(exports.getLanguage(l, null, true));
      });
    }
    return cb(null, country);
  } else {
    return cb('Wrong type of country code provided');
  }
};

exports.getLanguage = function (code, cb, noCountryInfo) {
  var languages = data.languages
    , language
    , codeFld = []
    , countrs;

  cb = cb || noop;

  if ('string' !== typeof code) {
    return cb('No language code provided');
  }
  code = code.toLowerCase();

  if (code.length == 2) {
    codeFld.push('iso639_1');
  } else if (code.length == 3) {
    codeFld.push('iso639_2');
    codeFld.push('iso639_2en');
    codeFld.push('iso639_3');
  }

  if (codeFld) {
    for (var i = 0; i < codeFld.length; i++) {
      language = _.find(languages, function (l) {
        return l[codeFld[i]] == code;
      });
      if (language) break;
    }
    if (!language) {
      return cb('There is no language with code "' + code + '"');
    }
    language = _.deepClone(language);
    if (!noCountryInfo) {
      countrs = language.countries;
      language.countries = [];
      _.each(countrs, function (c) {
        language.countries.push(exports.getCountry(c, null, true));
      });
    }
    return cb(null, language);
  } else {
    return cb('Wrong type of language code provided');
  }
};

exports.getCountryLanguages = function (code, cb) {
  var codes = [];

  cb = cb || noop;

  exports.getCountry(code, function (err, country) {
    if (err) return cb(err);
    _.each(country.languages, function (l) {
      codes.push({
          iso639_1: l.iso639_1
        , iso639_2: l.iso639_2en
        , iso639_3: l.iso639_3
      });
    });
  });
  return cb(null, codes);
};

exports.getLanguageCountries = function (code, cb) {
  var codes = [];

  cb = cb || noop;

  exports.getLanguage(code, function (err, language) {
    if (err) return cb(err);
    _.each(language.countries, function (c) {
      codes.push({
          code_2: c.code_2
        , code_3: c.code_3
        , numCode: c.numCode
      });
    });
  });
  return cb(null, codes);
};

exports.getCountryMsLocales = function (code, cb) {
  var codes = [];

  cb = cb || noop;

  exports.getCountry(code, function (err, country) {
    if (err) return cb(err);
    codes = country.langCultureMs;
  });
  return cb(null, codes);
};

exports.getLanguageMsLocales = function (code, cb) {
  var codes = [];

  cb = cb || noop;

  exports.getLanguage(code, function (err, language) {
    if (err) return cb(err);
    codes = language.langCultureMs;
  });
  return cb(null, codes);
};

exports.getLanguageFamilyMembers = function (family, cb) {
  var languages = data.languages
    , check
    , members
    , ret = [];

  cb = cb || noop;

  if ('string' !== typeof family) {
    return cb('No language family provided');
  }
  family = family.toLowerCase();

  check = _.find(data.languageFamilies, function (f) {
    return f.toLowerCase() == family;
  });
  if (!check) {
    return cb('There is no language family "' + family + '"');
  }

  members = _.filter(languages, function (l) {
    return l.family.toLowerCase() == family;
  });
  _.each(members, function (l) {
    ret.push(exports.getLanguage(l.iso639_3));
  });
  return cb(null, ret);
};

exports.getLocales = function (mode) {
  var locales = data.locales
    , ret = []
    , loc2;
  locales.forEach(function (loc) {
    loc2 = loc[2] ? '-' + loc[2] : '';
    if (mode) {
      ret.push(loc[0] + loc2 + '-' + loc[1]);
    } else {
      ret.push(loc[0] + '-' + loc[1] + loc2);
    }
  });
  return ret;
}
},{"./data.json":2,"./utils":4,"underscore":28,"underscore.deep":27}],4:[function(require,module,exports){
exports.isFunction = function (fn) {
  var getType = {};
  return fn && getType.toString.call(fn) === '[object Function]';
};

},{}],5:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":6,"es5-ext/object/is-callable":9,"es5-ext/object/normalize-options":13,"es5-ext/string/#/contains":16}],6:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":7,"./shim":8}],7:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],8:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":10,"../valid-value":15}],9:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],10:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":11,"./shim":12}],11:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],12:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],13:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":17,"./shim":18}],17:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],18:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],19:[function(require,module,exports){
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":5,"es5-ext/object/valid-callable":14}],20:[function(require,module,exports){
'use strict';

module.exports = require('./lib/franc');

},{"./lib/franc":23}],21:[function(require,module,exports){
module.exports={
  "Latin": {
    "spa": " de|os |de | la|la | y | a |es |ón |ión|rec|ere|der| co|e l|el |en |ien|cho|ent|ech|ció|aci|o a|a p| el|a l|al |as |e d| en|na |ona|s d|da |nte| to|ad |ene|con| pr| su|tod| se|ho |los| pe|per|ers| lo|o d| ti|cia|n d|cio| es|ida|res|a t|tie|ion|rso|te |do | in|son| re| li|to |dad|tad|e s|est|pro|que|men| po|a e|oda|nci| qu| un|ue |ne |n e|s y|lib|su | na|s e|nac|ia |e e|tra| pa|or |ado|a d|nes|ra |se |ual|a c|er |por|com|nal|rta|a s|ber| o |one|s p|dos|rá |sta|les|des|ibe|ser|era|ar |ert|ter| di|ale|l d|nto|hos|del|ica|a a|s n|n c|oci|imi|io |o e|re |y l|e c|ant|cci| as|las|par|ame| cu|ici|ara|enc|s t|ndi| so|o s|mie|tos|una|bre|dic|cla|s l|e a|l p|pre|ntr|o t|ial|y a|nid|n p|a y|man|omo|so |n l| al|ali|s a|no | ig|s s|e p|nta|uma|ten|gua|ade|y e|soc|mo | fu|igu|o p|n t|hum|d d|ran|ria|y d|ada|tiv|l e|cas| ca|vid|l t|s c|ido|das|dis|s i| hu|s o|nad|fun| ma|rac|nda|eli|sar|und| ac|uni|mbr|a u|die|e i|qui|a i| ha|lar| tr|odo|ca |tic|o y|cti|lid|ori|ndo|ari| me|ta |ind|esa|cua|un |ier|tal|esp|seg|ele|ons|ito|ont|iva|s h|d y|nos|ist|rse| le|cie|ide|edi|ecc|ios|l m|r e|med|tor|sti|n a|rim|uie|ple|tri|ibr|sus|lo |ect|pen|y c|an |e h|n s|ern|tar|l y|egu|gur|ura|int|ond|mat|l r|r a|isf|ote",
    "eng": " th|the| an|he |nd |and|ion| of|of |tio| to|to |on | in|al |ati|igh|ght|rig| ri|or |ent|as |ed |is |ll |in | be|e r|ne |one|ver|all|s t|eve|t t| fr|s a| ha| re|ty |ery| or|d t| pr|ht | co| ev|e h|e a|ng |ts |his|ing|be |yon| sh|ce |ree|fre|ryo|n t|her|men|nat|sha|pro|nal|y a|has|es |for| hi|hal|f t|n a|n o|nt | pe|s o| fo|d i|nce|er |ons|res|e s|ect|ity|ly |l b|ry |e e|ers|e i|an |e o| de|cti|dom|edo|eed|hts|ter|ona|re | no| wh| a | un|d f| as|ny |l a|e p|ere| en| na| wi|nit|nte|d a|any|ted| di|ns |sta|th |per|ith|e t|st |e c|y t|om |soc| ar|ch |t o|d o|nti|s e|equ|ve |oci|man| fu|ote|oth|ess| al| ac|wit|ial| ma|uni| se|rea| so| on|lit|int|r t|y o|enc|thi|ual|t a| eq|tat|qua|ive| st|ali|e w|l o|are|f h|con|te |led| is|und|cia|e f|le | la|y i|uma|by | by|hum|f a|ic | hu|ave|ge |r a| wo|o a|ms |com| me|eas|s d|tec| li|n e|en |rat|tit|ple|whe|ate|o t|s r|t f|rot| ch|cie|dis|age|ary|o o|anc|eli|no | fa| su|son|inc|at |nda|hou|wor|t i|nde|rom|oms| ot|g t|eme|tle|iti|gni|s w|itl|duc|d w|whi|act|hic|aw |law| he|ich|min|imi|ort|o s|se |e b|ntr|tra|edu|oun|tan|e d|nst|l p|d n|ld |nta|s i|ble|n p| pu|n s| at|ily|rth|tho|ful|ssi|der|o e|cat|uca|unt|ien| ed|o p|h a|era|ind|pen|sec|n w|omm|r s",
    "por": "os |de | de| a | e |o d|to |ão | di|ent|da |ito|em | co|eit|as |dir|es |ire|rei| se|ção|ade|a p|dad|e d|s d|men|nte|do |s e| pr| pe|dos| to| da|a a|o e| o |o a|ess|con|tod|que| qu|te |e a| do|al |res|ida|m d| in| ou|er |sso| na| re| po|a s| li|uma|cia|ar |pro|e e|a d| te|açã|a t| es| su|ou |ue |s p|tos|a e|des|ra |com|no |ame|ia |e p|tem|nto| pa|is |est|tra|ões|na |s o|oda|das|ser|soa|s n|pes|o p|s a|o s|e o| em| as| à |o o|ais|ber|ado|oa |o t|e s|man|sua|ua | no| os|a c|ter|çõe|erd|lib|rda|s s|nci|ibe|e n|ica|odo|so |nal|ntr|s t|hum|ura| ao|ona|ual| so|or |ma |sta|o c|a n|pre|ara|era|ons|e t|r a|par|o à| hu|ind|por|cio|ria|m a|s c| um|a l|gua|ran| en|ndi|o i|e c|raç|ion|nid|aci|ano|soc|e r|oci| ac|und|sen|nos|nsi|rec|ime|ali|int|um |per|nac| al|m o|r p| fu|ndo|ont|açõ| ig|igu|fun|nta| ma|uni|cçã|ere| ex|a i| me|ese|rio|l d|a o|s h|pel|ada|pri|ide|am |m p|pod|s f|ém |a f|io |ode|ca |ita|lid|tiv|e f|vid|r e|esp|nda|omo|e l|naç|o r|ant|a q|tad|lic|iva| fa|ver|s l|ial|cla|ngu|ing| ca|mo |der| vi|eli|ist|ta |se |ati|ios|ido|r o|eci|dis| un|e i|r d|ecç|o q|s i|qua|ênc|a m|seu|sti|nin|uer|rar|cas|aos|ens|gué|ias|sid|uém|tur|dam|sse|ao |ela|l e|for|tec|ote| pl|ena| tr|m c|tro| ni|ico|rot",
    "ind": "an |ang| da|ng | pe|ak | ke| me|ata| se|dan|kan| di| be|hak|ber|per|ran|nga|yan|eng| ya| ha|asa|gan|men|ara|nya|n p|n d|n k|a d|tan| at|at |ora|ala|san| ba|ap |erh|n b|rha|ya | ma|g b|a s|pen|eba|as |aan|uk |ntu| or|eti|tas|aka|tia|ban|set| un|n s|ter|n y| te|k m|tuk|bas|iap|lam|beb|am | de|k a|keb|n m|i d|unt|ama|dal|ah |ika|dak|ebe|p o|sa |pun|mem|n h|end|den|ra |ela|ri |nda| sa|di |ma |a m|n t|k d|n a|ngg|tau|man|gar|eri|asi| ti|un |al |ada|um |a p|lak|ari|au | ne|neg|a b|ngs|ta |ole|leh|ert|ers|ida|k h|ana|gsa|dar|uka|tid|bat|sia|era|eh |dap|ila|dil|h d|atu|sam|ia |i m| in|lan|aha|uan|tu |ai |t d|a a|g d|har|sem|na |apa|ser|ena|kat|uat|erb|erl|mas|rta|ega|ung|nan|emp|n u|kum|l d|g s| hu|ka |ent|pat|mba|aga|nta|adi| su|eni|uku|n i|huk|ind|ar |rga|i s|aku|ndi|sua|ni |rus|han|si |car|nny| la|in |u d|ik |ua |lah|rik|usi|emb|ann|mer|ian|gga|lai|min|a u|lua|ema|emu|arg|dun|dip|a t|mat|aya|rbu|aru|erk|rka|ini|eka|a k|rak|kes|yat|iba|nas|rma|ern|ese|s p|nus| pu|anu|ina| ta|mel|mua|kel|k s|us |ndu|nak|da |sya|das|pem|lin|ut |yar|ami|upu|seo|aik|eor|iny|aup|tak|ipe|ing|tin| an|dik|uar|ili|g t|rse|sar|ant|g p|a n|aks|ain| ja|t p| um|g m|dir|ksa|umu|kep|mum|i k|eca|rat|m p|h p|aba|ses|m m",
    "fra": " de|es |de |ion|nt |et |tio| et|ent| la|la |e d|on |ne |oit|e l|le | le|s d|e p|t d|ati|roi| dr|dro|it | à | co|té |ns |te |e s|men|re | to|con| l’|tou|que| qu|les| so|des|son| pe|ons| un|s l|s e| pr|ue | pa|e c|t l|ts |onn| au|e a|eme|e e| li|ont|ant|out|ute|t à|res|ers| sa|ce | a |tre|per|a d|cti|er |lib|ité| en|ux | re|en |rso|à l| ou| in|lle|un |nat|ou |nne|n d|une| d’| se|par|nte|us |ur |s s|ans|dan|a p|r l|pro|its|és |t p|ire|e t|s p|sa | dé|ond|é d|a l|nce|ert|aux|omm|nal|me | na| fo|iqu| ce|rté|ect|ale|ber|t a|s a| da|mme|ibe|san|e r| po|com|al |s c|qui|our|t e| ne|e n|ous|r d|ali|ter| di|fon|e o|au | ch|air|ui |ell| es|lit|s n|iss|éra|tes|soc|aut|oci|êtr|ien|int|du |est|été|tra|pou| pl|rat|ar |ran|rai|s o|ona|ain|cla|éga|anc|rs |eur|pri|n c|e m|s t|à u| do|ure|bre|ut | êt|age| ét|nsi|sur|ein|sen|ser|ndi|ens|ess|ntr|ir | ma|cia|n p|st |a c| du|l e| su|bli|ge |rés| ré|e q|ass|nda|peu|ée |l’a| te|a s|tat|il |tés|ais|u d|ine|ind|é e|qu’| ac|s i|n t|t c|n a|l’h|t q|soi|t s|cun|rit| ég|oir|’en|nta|hom| on|n e| mo|ie |ign|rel|nna|t i|l n| tr|ill|ple|s é|l’e|rec|a r|ote|sse|uni|idé|ive|s u|t ê|ins|act| fa|n s| vi|gal| as|lig|ssa|pré|leu|e f|lic|dis|ver| nu|ten|ssi|rot|tec|s m|abl",
    "deu": "en |er |der| un|nd |und|ein|ung|cht| de|ich|sch|ng | ge|ie |che|ech| di|die|rec|gen|ine|eit| re|ch | da|n d|ver|hen| zu|t d| au|ht | ha|lic|it |ten|rei| be|in | ve| in| ei|nde|auf|den|ede|zu |n s|uf |fre|ne |ter|es | je|jed|n u| an|sei|and| fr|run|at | se|e u|das|hei|s r|hte|hat|nsc|nge|r h|as |ens| al|ere|lle|t a| we|n g|rde|nte|ese|men| od|ode|ner|g d|all|t u|ers|te |nen| so|d d|n a|ben|lei| gr| vo|wer|e a|ege|ion| st|ige|le |cha| me|haf|aft|n j|ren| er|erk|ent|bei| si|eih|ihe|kei|erd|tig|n i|on |lun|r d|len|gem|ies|gru|tli|unt|chu|ern|ges|end|e s|ft |st |ist|tio|ati| gl|sta|gun|mit|sen|n n| na|n z|ite| wi|r g|eic|e e|ei |lie|r s|n w|gle|mei|de |uch|em |chl|nat|rch|t w|des|n e|hre|ale|spr|d f|ach|sse|r e| sc|urc|r m|nie|e f|fen|e g|e d| ni|dur|dar|int| du|geh|ied|t s| mi|alt|her|hab|f g|sic|ste|taa|aat|he |ang|ruc|hli|tz |eme|abe|h a|n v|nun|geg|arf|rf |ehe|pru| is|erf|e m|ans|ndl|e b|tun|n o|d g|n r|r v|wie|ber|r a|arb|bes|t i|h d|r w|r b| ih|d s|igk|gke|nsp|dig|ema|ell|eru|n f|ins|rbe|ffe|esc|igu|ger|str|ken|e v|gew|han|ind|rt | ar|ieß|n h|rn |man|r i|hut|utz|d a|ls |ebe|von|lte|r o|rli|etz|tra|aus|det|hul|e i|one|nne|isc|son|sel|et |ohn|t g|sam| fa|rst|rkl|ser|iem|g v|t z|err",
    "jav": "ng |an |ang| ka|ing|kan| sa|ak |lan| la|hak| ha| pa| ma|ngg|ara|sa |abe|ne | in|n k|ant| ng|tan|nin| an|nga|ata|en |ran| ba|man|ban|ane|hi |n u|ong|ra |nth|ake|ke |thi| da|won|uwo|ung|ngs| uw|asa|gsa|ben|sab|ana|aka|beb|a k|g p|nan|nda|adi|at |awa|san|ni |dan|g k|pan|eba| be|e k|g s|ani|bas| pr|dha|aya|gan|ya |wa |di |mar|n s| wa|ta |a s|g u| na|e h|arb|a n|a b|a l|n n| ut|yan|n p|asi|g d|han|ah |g n| tu| um|as |wen|dak|rbe|dar| di|ggo|sar|mat|k h|a a|iya| un|und|eni|kab|be |art|ka |uma|ora|n b|ala|n m|ngk|rta|i h| or|gar|yat|kar|al |a m|n i|na |g b|ega|pra|ina|kak|g a|a p|tum|nya|kal|ger|gge| ta|kat|i k|ena|oni|kas| pe|dad|aga|g m|duw|k k|uta|uwe| si| ne|adh|pa |n a|go |and|i l| ke|nun|nal|ngu|uju|apa|a d|t m|i p|min|iba|er | li|anu|sak|per|ama|gay|war|pad|ggu|ha |ind|taw|ras|n l|ali|eng|awi|a u| bi|we |bad|ndu|uwa|awe|bak|ase|eh | me|neg|pri| ku|ron|ih |g t|bis|iji|i t|e p| pi|aba|isa|mba|ini|a w|g l|ika|n t|ebu|ndh|ar |sin|lak|ur |mra|men|ku | we|e s|a i|liy| ik|ayo|rib|ngl|ami|arg|nas|yom|wae|ut |kon|ae |rap|aku| te|dil|tin|rga|jud|umu| as|rak|bed|k b|il |kap|h k|jin|k a| nd|e d|i s| lu|i w|eka|mum|um |uha|ate| mi|k p|gon|eda| ti|but|n d|r k|ona|uto|tow|wat|gka|si |umr|k l|oma",
    "vie": "ng |̣c |́c | qu| th|à |nh | ng|̣i | nh|và| va|̀n |uyê| ph| ca|quy|ền|yề|̀i | ch|̀nh| tr| cu|ngư|i n|gươ|ườ|́t |ời| gi|ác| co|̣t |ó |c t|ự |n t|cá|ông| kh|ượ|ợc| tư| đư|iệ|đươ|ìn|́i | ha|có|i đ|gia| đê|pha| mo|ọi|mọ|như|n n|củ| ba|̣n |̉a |ủa|n c|̀u |̃ng|ân |ều|ất| bi|tự|hôn| vi|g t| la|n đ|đề|nhâ| ti|t c| đô|ên |bả|hiê|u c| tô|do |hân| do|ch |́ q|̀ t| na|́n |ay | hi|àn|̣ d|ới|há| đi|hay|g n| mô|ốc|uố|n v|ội|hữ|thư|́p |quô| ho|̣p |nà|ào|̀ng|̉n |ị |́ch|ôn |̀o |khô|c h|i c|c đ| hô|i v|tro| đa|́ng|mộ|i t|ột|g v|ia |̣ng|ản|ướ|ữn|̉ng|h t|hư |ện|n b|ộc|ả |là|c c|g c| đo|̉ c|n h|hà|hộ| bâ|ã |̀y | vơ|̣ t|̉i |iế| cô|t t|g đ|ức|iên| vê|viê|vớ|h v|ớc|ực|ật|tha|̉m |ron|ong|áp|g b|hươ| sư|a c|sự|̉o |ảo|h c|ể |o v|uậ|a m|ế |iá|̀ c|cho|qua|hạ|ục| mi|̀ n|phâ|c q|côn|o c|á |i h|ại| hơ|̃ h| cư|n l|bị| lu|bấ|cả|ín|h đ| xa|độ|g h|c n|c p|thu|ải|ệ | hư|́ c|o n| nư|ốn|́o |áo|xã|oà|y t|hả|tộ|̣ c| tâ|thô| du|m v|mì|ho |hứ|ệc|́ t|hợ|án|n p|cũ|ũn|iể|ối|tiê|ề |hấ|ợp|hoa|y đ|chi|o h|ở |ày|̉ t|đó|c l|về|̀ đ|i b|kha|c b| đâ|luâ|ai |̉ n|đố|ết|hự|tri|p q|nươ|dụ|hí|g q|yên|họ|́nh| ta| bă|c g|n g|thê|o t|c v|am |c m|an ",
    "ita": " di|to | de|ion| in|la |e d|di |ne | e |zio|re |le |ni |ell|one|lla|rit|a d|o d|del|itt|iri|dir| co|ti |ess|ent| al|azi|tto|te |i d|i i|ere|tà | pr|ndi|e l|ale|o a|ind|e e|e i|gni|nte|con|i e|li |a s| un|men|ogn| ne|uo | og|idu|e a|ivi|duo|vid| es|tti| ha|div| li|a p|no |all|pro|za |ato|per|sse|ser| so|i s| la| su|e p| pe|ibe|na |a l| il|ber|e n|il |ali|lib|ha |che|in |o s|e s| qu|o e|ia |e c| ri|nza|ta |nto|he |oni|o i| o |sta|o c|nel| a |o p|naz|e o|so | po|o h|gli|i u|ond|i c|ers|ame|i p|lle|un |era|ri |ver|ro |el |una|a c| ch|ert|ua |i a|ssi|rtà|a e|ei |dis|ant| l |tat|a a|ona|ual| le|ità|are|ter| ad|nit| da|pri|dei|à e|cia| st| si|nal|est|tut|ist|com|uni| ed|ono| na|sua|al |si |anz| pa| re|raz|gua|ita|res|der|soc|man|o o|ad |i o|ese|que|enz|ed | se|io |ett|on | tu|dic|à d|sia|i r|rso|oci|rio|ari|qua|ial|pre|ich|rat|ien|tra|ani|uma|se |ll |eri|a n|o n| um|do |ara|a t|zza|er |tri|att|ico|pos|sci|i l|son|nda|par|e u|fon| fo|nti|uzi|str|utt|ati|sen|int|nes|iar| i |hia|n c|sti|chi|ann|ra | eg|egu|isp|bil|ont|a r| no|rop| me|opr|ost| ma|ues|ica|sso|tal|cie|sun|lit|ore|ina|ite|tan| ra|non|gio|d a|e r|dev|i m|l i|ezz|izi| cu|nno|rà |a i|tta|ria|lia|cos|ssu|dal|l p| as|ass|opo|ve |eve",
    "tur": " ve| ha|ve |ler|lar|ir |in |hak| he|her|bir|er |an |arı|eri|ya | bi|ak |r h|eti|ın |iye|yet| ka|ası|ını| ol|tle|eya|kkı|ara|akk|etl|sın|esi|na |de |ek | ta|nda|ini| bu|ile|rın|rin|vey|ne |kla|e h|ine|ır |ere|ama|dır|n h| sa|ına|sin|e k|le | ge|mas|ınd|nın|ı v| va|lan|lma|erk|rke|nma|tin|rle| te|nin|akl|a v|da | de|let|ill|e m|ard|en |riy|aya|nı | hü| şa|e b|k v|kın|k h| me|mil|san| il|si |rdı|e d|dan|hür|var|ana|e a|kes|et |mes|şah|dir| mi|ret|rri| se|ola|ürr|irl|bu |mak| ma|mek|n e|kı |n v|n i|lik|lle| ed| hi|n b|a h| ba|nsa| iş|eli|kar| iç|ı h|ala|li |ulu|rak|evl|e i|ni |re |r ş|eme|etm|e t|ik |e s|a b|iş |n k|hai|nde|aiz| eş|izd|un |olm|hiç|zdi|ar |unm|ma | gö|ilm|lme|im |n t|tir|dil|mal|e g|i v| ko|lun|e e|mel|ket|ık |n s|ele|la |el |r v|ede|şit|ili|eşi|yla|a i| an|anı| et|rı |ahs| ya|sı |edi|siy|t v|i b|se |içi|çin|bul|ame| da|miş|may|tim|a k|tme|r b|ins|yan|nla|mle| di|eye|ger|ye |uğu|erd|din|ser| mü|mem|vle| ke|nam|ind|len|eke|es | ki|n m|it | in| ku|rşı|a s|arş| ay|eml|lek|oru|rme|kor|rde|i m| so|tür|al |lam|eni|nun| uy|ken|hsı|i i|a d|ri |dev|ün |a m|r a|mey|cak|ıyl|maz|e v|ece|ade|iç |şma|mse|te |tün|ims|kim|e y|şı |end|k g|ndi|alı| ce|lem|öğr|ütü|k i|r t| öğ|büt|anl| bü",
    "pol": " pr|nie| i |ie |pra| po|ani|raw|ia |nia|wie|go | do|ch |ego|iek|owi| ni|ści|ci |a p|do |awo| cz|ośc|ych| ma|ek |rze| na|prz| w |wo |ej | za|noś|czł|zło|eni|wa | je|łow|i p|wol|oln| lu|rod| ka| wo|lno|wsz|y c|ma |ny |każ|ażd|o d|stw|owa|dy |żdy| wy|rzy|sta|ecz| sw|dzi|i w|e p|czn|twa|na |zys|ów |szy|ub |lub|a w|est|kie|k m|wan| sp|ają| ws|e w|pow|pos|nyc|rac|spo|ać |a i|cze|sze|neg|yst|jak| ja|o p|pod|acj|ne |ńst|aro|mi | z |i i|nar| ko|obo|awa| ro|i n|jąc|zec|zne|zan|dow| ró|iej|zy |zen|nic|ony|aw |i z|czy|no |nej|o s|rów|odn|cy |ówn|odz|o w|o z|jeg|edn|o o|aki|mie|ien|kol| in|zie|bez|ami|eńs|owo|dno| ob| or| st|a s|ni |orz|o u|ym |stę|tęp|łec|jed|i k| os|w c|lwi|ez |olw|ołe|poł|cji|y w|o n|wia| be|któ|a j|zna|zyn|owe|wob|ka |wyc|owy|ji | od|aln|inn|jes|icz|h p|i s|się|a o|ją |ost|kra|st |sza|swo|war|cza|roz|y s|raz|nik|ara|ora|lud|i o|a z|zes| kr|ran|ows|ech|w p|dów|ą p|pop|a n|tki|stk|gan|zon|raj|e o|iec|i l| si|że |eka| kt| de|em |tór|ię |wni|lni|ejs|ini|odo|dni|ełn|kow|peł|a d|ron|dek|pie|udz|bod|nan|h i|dst|ieg|taw|z p|z w|zeń|god|iu |ano|lar| to|y z|a k|ale|kla|trz|zaw|ich|e i|ier|iko|dzy|chn|w z|by |ków|adz|ekl|ywa|ju |och|kor|sob|ocz|oso|u p|du |tyc|tan|ędz| mi|e s| ta|ki ",
    "gax": "aa |an |uu | ka|ni |aan|umm|ii |mma|maa| wa|ti |nam| fi|ta |tti| na|saa|fi | mi|rga|i k|a n| qa|dha|iyy|oot|in |mir|irg|raa|qab|a i|a k|kan|akk|isa|chu|amu|a f|huu|aba|kka| ta|kam|a a| is|amn|ami|att|ach|mni|yaa| bi|yuu|yyu|ee |wal|miy|waa|ga |ata|aat|tii|oo |a e|moo| ni| ee|ba | ak|ota|a h|i q| ga| dh|daa|haa|a m|ama|yoo|a b|i a|ka |kaa| hi|sum|aas|arg|man| hu| uu|u n| yo| ar| ke| ha|ees| ba|uf |i i|taa|uuf|iin|ada|a w|i f|ani|rra|na |isu| ad|i w|a u|nya|irr|da |hun|hin|ess| ho| ma|i m|und|i b|bar|ana|een|mu |is |bu |f m| ir| sa|u a|add|aad| la|i d|n h|eeg|i h|sa |hoj|abu| ya|kee|al |udh|ook|goo|ala|ira|nda|itt|gac|as |n k|mum|see|rgo|uum|ra |n t|n i|ara|muu|ums|mat|nii|sii|ssa|a d|a q| da|haw|a g|yya|asu|eef|u h|tum|biy| mo|a t|ati|eny|gam|abs|awa|roo|uma|n b|n m|u y|a s|sat|baa|gar|n a|mmo|nis| qo|nna| ku|eer| to|kko|bil|ili|lis|bir|otu|tee|ya |msa|aaf|suu|n d|jii|n w|okk|rka|gaa|ald|un |rum| ye|ame| fu|mee|yer|ero|amm|era|kun|i y|oti|tok|ant|ali|nni| am|lda|lii|n u|lee|ura|lab|aal|tan|laa|i g|ila|ddu|aru|u m|oji|gum|han|ega| se|ffa|dar|faa|ark|n y|hii|qix|gal|ndi| qi|asa|art|ef |uud| bu|jir| ji|arb|n g|chi|tam|u b|dda|bat|di |kar|lam|a l| go|bsi|sad|oka|a j|egu|u t|bee|u f|uun",
    "swh": "a k|wa |na | ya| ku|ya | na| wa|a m| ha|i y|a h|a n|ana|ki |aki|kwa| kw|hak| ka| ma|la |a w|tu |li |a u|ni |i k|a a|ila| ki|ali|a y|ati|za |ili|ifa| mt|ke | an|kil|kat|mtu|ake|ote|te |ka |ika|ma |we |a s|yo |fa |i n|ata|e k|ama|zi |amb|u a|ia |u w| yo|azi|kut|ina|i z|asi| za|o y|uhu|yak|au |ish|mba|e a|u k|hur|ha |tik|wat| au|uru| bi|sha|mu |ara|u n| as|hi | hi|ru |aif|tai|cha|ayo|a b|hal| uh| ch|yot|i h| zi|awa|chi|atu|e n|ngi|u y|mat|shi|ani|eri| am|uli|ele|sa |ja |e y|a t|oja|o k|nch|i a|a j| nc|ima| sh|ami| ta|end|any|moj|i w|ari|ham|uta|ii |iki|ra |ada|wan|wak|nay|ye |uwa| la|ti |eza|o h|iri|iwa|kuw|iwe| wo|fan| sa|she|bu |kan|ao |jam|wen|lim|i m|her|uto|ria| ja| ni|kam|di | hu|zo |a l|da |kaz|ahi|amu|wot|o w|si |dha|bin|ing|adh|a z|bil|e w|nya|kup|har|ri |ang|aka|sta|aji|ne |kus|e m|zim|ini|ind|lin|kul|agu|kuf|ita|bar|o n|uu |iyo|u h|nad|maa|mwe|ine|gin|nye|nde|dam|ta | nd|ndi|rik|asa| ba|rif|uni|nga|hii|lez|bo |azo|uzi|mbo|sil|ush|tah|wam|ibu|uba|imu| ye|esh| ut|taa|aar|wez|i s|e b| si|ala|dhi|eng|aza|tak|hir|saw|izo|kos|tok|oka|yan|a c|wal|del|i b|pat| um|ndo|zwa|mam|a i|guz|ais|eli|mai|laz|ian|aba|man|ten|zin|ba |nda|oa |u m|uku|ufu| mw|liw|aha|ndw|kuh|ua |upa| el|umi|sia",
    "sun": "an |na |eun| ka|ng | sa|ana|ang| di|ak | ha|nga|hak|un |ung|keu|anu| ba| an|nu |a b| bo| je|a h|ata|asa|jeu|ina| ng|ara|nan|awa|gan|ah |sa |a k| na|n k|kan|aha|a p|a s|ga |ban| ma|a n|ing|oga|bog|sar| pa| ku|man|a a|ha |san|ae |bae|din|g s|aga|sah|ra |tan|n s| pe|ala| si|kat|ma |per| ti|aya|sin| at| pi| te|n a|aan|lah|pan|gar|n n|u d|ta |eu |ari|kum|ngs|a m|n b|n d|ran|a d|gsa|wa |taw|k h|ama|ku |ike|n p|eba|bas| ja|al |a t|ika|at |beb|kab|pik|asi|atu|nda|una|a j|nag|e b|n h|en |g k|oh |aba|ila|rta|aku|boh|ngg|abe|art|ar |n j|di |ima|um |ola|geu|usa|aca|sak|adi|k a|udu|teu|car|tin| me| ay|h k| po|eh |u s|aka|rim|ti |sac|k n|ngt|jen|awe|ent|u a|uma|teh|law|ur |h s|dan|bar|uku|gaw|aru|ate|iba|dil|pol|aja|ieu|ere|jal|nar| hu|n t|nya|pa |are|upa|mas|ake|ut |wan| ge|kal|nus| so|ngk|ya |yan|huk| du|tun| mi|mpa|isa|lan|ura|u m|uan|ern|ena|nte|rup|tay|n m| ke|ka |han|und|us |h b|kud|ula|tut| tu| ie|hna|kaw|u k|lak|gam|mna|umn|g d| nu|yun|ri |ayu|wat| wa|eri|g n|a u|i m|u p| ta|du |dit|umu|k k|ren|mba|rik|gta| be|ali|h p|h a|eus|u n|alm|il | da|sas|ami|min|lma|ngu|nas|yat|rak|amp|mer|k j|sab|mum| ra|rua|ame|ua |ter|sal|ksa|men|kas|nge|k d|ona| bi|bis|sio|ion|nal|taa| de|uh |gal|dip|we |bad",
    "ron": " de|și | și|re | în|are|te |de |ea |ul |rep|le |ept|dre|e d| dr|ie |în |e a|ate|ptu| sa|tul| pr|or |e p| pe|la |e s|ori| la| co|lor| or|ii |rea|ce |au |tat|ați| a | ca|ent| fi|ale|ă a|a s| ar|ers|per|ice| li|uri|a d|al | re|e c|ric|nă |i s|e o|ei |tur| să|lib|con|men|ibe|ber|rso|să |tăț|sau| ac|ilo|pri|ăți|i a|i l|car|l l|ter| in|ție|că |soa|oan|ții|lă |tea|ri |a p| al|ril|e ș|ană|in |nal|pre|i î|uni|ui |se |e f|ere|i d|e î|ita| un|ert|ile|tă |a o| se|i ș|pen|ia |ele|fie|i c|a l|ace|nte|ntr|eni| că|ală| ni|ire|ă d|pro|est|a c| cu| nu|n c|lui|eri|ona| as|sal|ând|naț|ecu|i p|rin|inț| su|ră |e n| om|ici|nu |i n|oat|ări|l d| to|tor| di| na|iun| po|oci|tre|ni |ste|soc|ega|i o|gal| so| tr|ă p|a a|n m|sta|va |ă î|fi |res|rec|ulu|nic|din|sa |cla|nd | mo| ce| au|ara|lit|int|i e|ces|uie|at |rar|rel|iei|ons|e e|leg|nit|ă f| îm|a î|act|e l|ru |u d|nta|a f|ial|ra |ă c| eg|ță | fa|i f|rtă|tru|tar|ți |ă ș|ion|ntu|dep|ame|i i|reb|ect|ali|l c|eme|nde|n a|ite|ebu|bui|ât |ili|toa|dec| o |pli|văț|nt |e r|u c|ța |t î|l ș|cu |rta|cia|ane|țio|ca |ită|poa|cți|împ|bil|r ș| st|omu|ăță|țiu|rie|uma|mân| ma|ani|nța|cur|era|u a|tra|oar| ex|t s|iil|ta |rit|rot|mod|tri|riv|od |lic|rii|eze|man|înv|ne |nvă|a ș|cti",
    "hau": "da | da|in |a k|ya |an |a d|a a| ya| ko| wa| a |sa |na | ha|a s|ta |kin|wan|wa | ta| ba|a y|a h|n d|n a|iya|ko |a t|ma |ar | na|yan|ba | sa|asa| za| ma|a w|hak|ata| ka|ama|akk|i d|a m| mu|su |owa|a z|iki|a b|nci| ƙa| ci| sh|ai |kow|anc|nsa|a ƙ|a c| su|shi|ka | ku| ga|ci |ne |ani|e d|uma|‘ya|cik|kum|uwa|ana| du| ‘y|ɗan|ali|i k| yi|ada|ƙas|aka|kki|utu|n y|a n|hi | ra|mut| do| ad|tar| ɗa|nda| ab|man|a g|nan|ars|and|cin|ane|i a|yi |n k|min|sam|ke |a i|ins|yin|ki |nin|aɗa|ann|ni |tum|za |e m|ami|dam|kan|yar|en |um |n h|oka|duk|mi | ja|ewa|abi|kam|i y|dai|mat|nna|waɗ|n s|ash|ga |kok|oki|re |am |ida|sar|awa|mas|abu|uni|n j|una|ra |i b| ƙu|dun|a ‘|cew|a r|aba|ƙun|ce |e s|a ɗ|san|she|ara|li |kko|ari|n w|m n|buw|aik|u d|kar| ai|niy| ne|hal|rin|bub|zam|omi| la|rsa|ubu|han|are|aya|a l|i m|zai|ban|o n|add|n m|i s| fa|bin|r d|ake|n ‘|uns|sas|tsa|dom| ce|ans| hu|me |kiy|ƙar| am|ɗin| an|ika|jam|i w|wat|n t|yya|ame|n ƙ|abb|bay|har|din|hen|dok|yak|n b|nce|ray|gan|fa |on | ki|aid| ts|rsu| al|aye| id|n r|u k|ili|nsu|bba|aur|kka|ayu|ant|aci|dan|ukk|ayi|tun|aga|fan|unc| lo|o d|lok|sha|un |lin|kac|aɗi|fi |gam|i i|yuw|sun|aif|aja| ir|yay|imi|war| iy|riy|ace|nta|uka|o a|bat|mar|bi |sak|n i| ak|tab|afi|sab",
    "bos": " pr| i |je |rav| na|pra|na |da |ma |ima| sv|a s|nje|a p| da| po|anj|a i|vo |va |ko |ja | u |ako|o i|no | za|e s|ju |avo| im|ti |sva|ava|i p|o n|li |ili|i s|van|ost| ko|vak|ih |ne |a u| sl|nja|koj| dr| ne|jed| bi|i d|ije|stv|u s|lob|im |slo| il|bod|obo| ra|sti|pri| je| su|vje|om |a d|se |e i| ob|a n|i i| se|dru|enj| os|voj|cij|e p|a b|su |o d|uje|u p|raz|i n|a o| od|lo |u o|ova|u i|edn|i u| nj|ovo|jen|lju|ni |oje|nos|a k|ran|dje|iti|o p|aci|žav|a j|i o|e o|pre|pro|bra|nih|ji | ka|e d|jeg|og |sta| tr|tre|bud|u n|drž|u z|rža|bit|svo|ija|elj|reb|e b|mij|jem|avn|pos| bu|ka |aju| iz|ba |ve |rod|de |aro|e u|iva|a z|em |šti|ilo|eni|lje|ći |red|bil|jel|jer| ni|odn|m i|du |tva|nar|gov| sa|oji| do|tu |vim|u d| st|o k|e n|a t|za |nim| dj| sm|ući|ičn|dna|i m|oda|vno|eba|ist|nac|e k|čno|nak|ave|tiv|eđu|nov|olj|sno|ani|aln|an |nom|i b|stu|nst|eno|oj |osn|a r|ovj|nap|smi|nog|čov|oja|nju|ara|nu |dno|ans|ovi|jan|edi|m s| kr|h p|tup| op| čo|iko|jek|tvo| vj| mi|tel|vu |obr|živ|tit|o o|una|odu| mo| ov|kri|ego|din|rug|nik|rad|pod|nji|sam|sto|lja|dst|rim|ite|riv| te|m n|vol|i v|e t|vni|akv|itu|g p| ta|ašt|zaš|svi|ao |te |o s|ak |mje|a č|odr|udu|kla|i t|avi|tno|nič| vr|nic|dni|u u|ina| de|oba|od |jih|st ",
    "hrv": " pr| i |je |rav|pra|ma | na|ima| sv|na |ti |a p|nje| po|a s|anj|a i|vo |ko |da |vat|va |no | za|i s|o i|ja |avo| u | im|sva|i p| bi|e s|ju |tko|o n|li |ili|van|ava| sl|ih |ne |ost| dr|ije| ne|jed|slo| ra|u s|lob|obo| os|bod| da| ko|ova|nja|koj|i d|atk|iti| il|stv|pri|om |im | je| ob| su| ka|i i|i n|e i|vje|i u|se |dru|bit|voj|ati|i o|ćen|a o|o p|a b|a n|ući| se|enj|sti|a u|edn|dje|lo |ćav| mo|raz|u p| od|ran|ni |rod|a k|su |aro|drć|svo|ako|u i|rća|a j|mij|ji |nih|eni|e n|e o| nj|pre|pos|ćiv|oje|eno|e p|nar|oda|nim|ovo|aju|ra |ći |og |nov|iva|a d|nos|bra|bil|i b|avn|a z|jen|e d|ve |ora|tva|jel|sta|mor|u o|cij|pro|ovi|za |jer|ka |sno|ilo|jem|red|em |lju|osn|oji| iz|aci| do|lje|i m| ni|odn|nom|jeg| dj|vno|vim|elj|u z|o d|rad|o o|m i|du |uje| sa|nit|e b| st|oj |tit|a ć|dno|e u|o s|u d|eću|ani|dna|nak|nst|stu| sm|e k|u u|an |gov|nju|juć|aln|m s|tu |a r|ćov|jan|u n|o k|ist|ću |te |tvo|ans|šti|nu |ara|nap|m p|nić|olj|bud| bu|edi|ovj|i v|pod|sam|obr|tel| mi|ina|zaš|e m|ašt| vj|ona|nji|jek| ta|duć|ija| ćo|tup|h p|oja|smi|ada| op|oso|una|sob|odu|dni|rug|udu|ao |di |avi|tno|jim|itu|itk|će |odr|ave|meć|nog|din|svi| ći|kak|kla|rim|akv|elo|štv|ite|vol|jet|opć|pot|tan|ak |nic|nac|uće| sk| me|ven",
    "nld": "en |de |an | de|van| va| en| he|ing|cht|der|ng |n d|n v|et |een| ge|ech|n e|ver|rec|nde| ee| re| be|ede|er |e v|gen|den|het|ten| te| in| op|n i| ve|lij| zi|ere|eli|zij|ijk|te |oor|ht |ens|n o|and|t o|ijn|ied|ke | on|eid|op | vo|jn |id |ond|in |sch| vr|aar|n z|aan| ie|rde|rij|men|ren|ord|hei|hte| we|eft|n g|ft |n w|or |n h|eef|vri|wor| me|hee|al |t r|of |le | of|ati|g v|e b|eni| aa|lle| wo|n a|e o|nd |r h|voo| al|ege|n t|erk| da| na|t h|sta|jke|at |nat|nge|e e|end| st|om |e g|tie|n b|ste|die|e r|erw|wel|e s|r d| om|ij |dig|t e|ige|ter|ie |gel|re |jhe|t d| za|e m|ers|ijh|nig|zal|nie|d v|ns |d e|e w|e n|est|ele|bes| do|g e|che|vol|ge |eze|e d|ig |gin|dat|hap|cha|eke| di|ona|e a|lke|nst|ard| gr|tel|min| to|waa|len|elk|lin|eme|jk |n s|del|str|han|eve|gro|ich|ven|doo| wa|t v|it |ove|rin|aat|n n|wet|uit|ijd|ze | zo|ion| ov|dez|gem|met|tio|bbe|ach| ni|hed|st |all|ies|per|heb|ebb|e i|toe|es |taa|n m|nte|ien|el |nin|ale|ben|daa|sti| ma|mee|kin|pen|e h|wer|ont|iet|tig|g o|s e| er|igd|ete|ang|lan|nsc|ema|man|t g|is |beg|her|esc|bij|d o|ron|tin|nal|eer|p v|edi|erm|ite|t w|t a| hu|rwi|wij|ijs|r e|weg|js |rmi|naa|t b|app|rwe| bi|t z|ker|ame|eri|ken| an|ar | la|tre|ger|rdi|tan|eit|gde|g i|d z|oep",
    "srp": " pr| i |rav|pra| na|na |ma | po|je | sv|da |a p|ima|ja |a i|vo |nje|va |ko |anj|ti |i p| u |ako|a s| da|avo|i s|ju |ost| za|sva|o i|vak| im|e s|o n|ava| sl|nja| ko|no |ne |li |om | ne|ili| dr|u s|slo|koj|a n|obo|ih |lob|bod|im |sti|stv|a o| bi| il| ra|pri|a u|og | je|jed|e p|enj|ni |van|u p|nos|a d|iti|a k|edn|i u|pro|o d|ova| su|ran|cij|i i|sta|se | os|e i|dru| ob|i o|rod|aju|ove| de|i n| ka|aci|e o| ni| od|ovo|i d|ve | se|eni|voj|ija|su |u i|žav|avn|uje| st|red|m i|dna|a b|odi|ara|drž|ji |nov|lju|e b|rža|tva|što|u o|oja| ov|a j|odn|u u|jan|poš|jen| nj|nim|ka |ošt|du |raz|a z| iz|sno|o p|vu |u n|u d|šti|osn|e d|pre|u z|de |ave|nih|bit|aro|oji|bez|tu |gov|lje|ičn| sa|lja|svo|lo |za |vno|e n|eđu| tr|nar| me|vim|čno|oda|ani|đen|nac|nak|an |to |tre|ašt| kr|stu|nog|o k|m s|tit|aln|nom|oj |pos|e u|reb| vr|olj|dno|iko|ku |me |nik| do|ika|e k|jeg|nst|tav|em |i m|sme|o s|dni|bra|nju|šen|ovi|tan|te |avi|vol| li|zaš|ilo|rug|var|kao|ao |riv|tup|st |živ|ans|eno|čov|štv|kla|vre|bud|ena| ve|ver|odu|međ|oju|ušt| bu|kom|kri|pod|ruš|m n|i b|ba |a t|ugi|edi| mo|la |u v|kak| sm|ego|akv|o j|rad|dst|jav|del|tvo| op|nu |por|vlj|avl|m p|od |jem|oje| čo|a r|sam|i v|ere|pot|o o|šte|rem|vek|svi| on|rot|e r",
    "ckb": " he| û |ên | bi| ma|in |na | di|maf|an |ku | de| ku| ji|xwe|her| xw|iya|ya |kes|kir|rin|iri| ne|ji |bi |yên|afê|e b|de |tin|e h|iyê|ke |es |ye | we|er |di |we |ê d|i b| be|erk|ina| na| an|î û|yê |eye|î y|kî |rke|nê |diy|ete|eke|ber|hem|hey| li| ci|wek|li |n d|fê | bê| te|ne |yî | se|net|rî |tew|yek|sti|af | ki|re |yan|n b|kar|hev|e k|aza|n û|wî | ew|i h|n k|û b|î b| mi| az|dan| wî|ekî|î a|a m|zad|e d|mir|bin|est|ara|iro|nav|ser|a w|adi|rov|n h|anê|tê |ewe|be |ewl|ev |mû | ya|tî |ta |emû| yê|ast|wle| tê|n m| bo|wey|s m|bo | tu|n j|ras| da| me|din|î d|ê h|n n|n w|ing|st | ke| ge|în |ar | pê|iye|îna|bat|r k|ema|cih|ê b|wed|û m|dî |û a|vak|ê t|ekh|par| ye|vî |civ|n e|ana|î h|ê k|khe|geh|nge|ûna|fên|ane|av |î m|bik|eyê|eyî|e û| re|man|erb|a x|vê |ê m|iva|e n|hî |bûn|kê | pa|erî|jî |end| ta|ela|nên|n x|a k|ika|f û|f h|î n|ari|mî |a s|e j|eza|tên|nek| ni|ra |ehî|tiy|n a|bes|rbe|û h|rwe|zan| a |erw|ov |inê|ama|ek |nîn|bê |ovî|ike|a n| ra|riy|i d|anî|û d|e e|etê|ê x|yet|aye|ê j|tem|e t|erd|i n|eta|ibe|a g|u d|xeb|atê|i m|tu | wi|dew|mal|let|nda|ewa| ên|awa|e m|a d|mam|han|u h|a b|pêş|ere| ba|lat|ist| za|bib|uke|tuk|are|asî|rti|arî|i a|hîn| hî|edi|nûn|anû|qan| qa| hi| şe|ine|n l|mên|ûn |e a",
    "yor": "ti | ní|ó̩ | è̩|ní | lá|̩n |o̩n|é̩ |wo̩|àn | e̩|kan|an |tí | tí|tó̩| kò|ò̩ |̩tó| àw| àt|è̩ |è̩t|e̩n|bí |àti|lát|áti| gb|lè̩|s̩e| ló| ó |àwo|gbo|̩nì|n l| a | tó|í è|ra | s̩|n t|ò̩k|sí |tó |̩ka|kò̩|ìyà|o̩ | sí|ílè|orí|ni |yàn|dè |̩‐è|ì k|̩ à|èdè| or|ún |ríl|è̩‐|í à|jé̩|‐èd|àbí|̩ò̩|ò̩ò|tàb|nì |í ó|n à| tà|̩ l|jo̩| ti|̩e |̩ t| wo|nìy|í ì|ó n| jé| sì|ló |kò |n è|wó̩| bá|n n|sì | fú|̩ s|í a|rè̩|fún| pé| òm|̩ni|gbà| kí| èn|ènì|in |òmì|ìí |ba |nir|pé |ira|mìn|ìni|n o|ràn|ìgb| ìg|bá |e̩ | rè|̩ n|kí |n e|un |gba|̩ p|í ò|nú | o̩|nín|gbé|yé | ka|ínú|a k|fi | fi|mo̩|bé̩|o̩d|dò̩|̩dò|ó s|i l|̩ o|̩ ì|wà |í i|i ì|hun|bò |i ò|dá |bo̩|o̩m|̩mo|̩wó|bo |áà |̩ k|ó j|ló̩|àgb|ohu| oh| bí| ò̩|bà |ara|yìí|ogb|írà|n s|ú ì| ìb|pò̩|í k| lè|bog|i t|à t|óò |yóò|kó̩|gé̩|à l|ó̩n|rú |lè | yó|̩ ò|̩ e|a w|̩ y|ò̩r|̩ f| wà|ò l|í t|ó b|i n|ó̩w|̩gb|yí |í w|ìké|̩ a|láà|wùj|àbò|i è|ùjo|fin|é̩n|n k|í e|i j|ú à| ìk|òfi| òf| ar|i s|mìí|ìír| mì| ir|rin|náà| ná|jú |̩ b| yì|ó t|̩é̩| i |̩ m|fé̩|kàn|rí |ú è|à n|wù |s̩é|é à| mú| èt|áyé|í g|̩kó|̩dá|è̩d|àwù|è̩k| ìd|irú|í o|i o|i à|láì|í n|ípa| kú|níp| ìm|a l|ké̩|bé |i g|de |ábé|ìn |báy|̩è̩|ígb|wò̩|níg|mú |láb| àà|n f|è̩s|̩ w|ùn |i a|ayé|èyí| èy|mó̩|á è| ni|n b| wó|je̩| ìj|gbá|ò̩n|ó̩g",
    "uzn": "lar|ish|an |ga |ar | va| bi|da |va |ir | hu|iga|sh |uqu|shi|bir|quq|huq|gan| bo| ha|ini|ng |a e|r b| ta|lis|ni |ing|lik|ida|oʻl|ili|ari|nin|on |ins| in|adi|nso|son|iy | oʻ|lan| ma|dir|hi |kin|har|i b|ash| yo|boʻ| mu|dan|uqi|ila|ega|qla|r i|qig|oʻz| eg|kla|a b|qil|erk|ki | er|oli|nli|at | ol|gad|lga|rki|oki|i h|a o| qa|yok|lig|osh|igi|ib |las|n b|atl|n m| ba|ara| qi|ri | sh|iya|ala|lat|in |ham|bil|a t|a y|bos|r h|siy|n o|yat|inl|ik |a q|cha|a h| et|eti|nis|a s|til|ani|h h|i v|mas|tla|osi|asi| qo|ʻli|ati|i m|rni|im |uql|arn|ris|qar|a i|gi | da|n h|ha |sha|i t|mla|rch| xa|i o|li |hun|bar|lin|ʻz |arc|rla| bu|a m|a a| as|mum| be| tu|aro|r v|ikl|lib|taʼ|h v|tga|tib|un |lla|mda| ke|shg| to|n q|sid|n e|mat|amd|shu|hga| te|tas|ali|umk|oya|hla|ola|aml|iro|ill|tis|iri|rga|mki|irl| ya|xal|dam| de|gin|eng|rda|tar|ush|rak|ayo| eʼ| so|ten|alq| sa|ur | is|imo|r t| ki|mil| mi|era|zar|hqa|aza|k b| si|nda|hda|kat|ak |oʻr|n v|a k|or |rat|ada|ʻlg|miy|tni|i q|shq|oda|shl|bu |dav|nid|y t|ch |asl|sos|ilg|aso|n t|atn|sin|am |ti |as |ana|rin|siz|yot|lim|uni|nga|lak|n i|a u|qon|i a|h k|vla|avl|ami|dek| ja|ema|a d|na | em|ekl|gʻi|si |i e|ino| ka|uch|bor|ker| ch|lma|liy|a v|ʼti|lli|aka|muh|rig|ech|i y|uri|ror",
    "ibo": "a n|e n|ke | na|na | ọ | bụ| n |nwe|ere|ọ b|re |nye| nk|ya |la | nw| ik| ma|ye |e ọ|ike|a o|nke|a m|ụ n| ya|a ọ|ma |bụl|ụla| on| a |e i|kik|iki|ka |ony|ta |bụ |kwa| nd|a i|i n|di |a a|wa |wer|do | mm|dụ |e a|ha | ga|any| ob|ndi| ok|he |e m|e o|a e|ọ n|ite|rụ |hi |mma|ga‐|wu |ara| dị|aka|che|oke|we |o n| ih|n o|adụ|mad|obo|bod|a g|odo| ka| ez|te |hị |be |ụta|dị | an|zi | oh|a‐e|akw|gba|i m|me | ak|u n|nya|ihe|ala|ohe|ghi|ri | ọz|her|ra |weg| nt| iw| mb|ba |pụt| si|ro |oro|iwu|chi|a‐a|rị |ụ i|ụ ọ| eb|iri|ebe|ụrụ|zọ | in|a y|ezi|e ị|kpa|le |ile|ịrị|n e|kpe|mba| ha|bi |sit|e e|inw|nil|asị| en|mak|a u| ni|apụ|chị|i i|ghị|i ọ|i o|si | e |ide|o i|e y|ụ m|a s|u o|kwu|ozu|yer|ru |enw|ụ o|ọzọ|gid|hụ |n a|ahụ|nkw|sor|egh|edo|a ụ|tar|n i|toz|ị o|pa |i a| me|ime|uru|kwe| mk|tu |ama|eny|uso|de | im|ọ d|osi|hed|a d| kw|mkp|wet| ọr| ọn|obi|ọrụ| ịk| to|gas| ch|ịch|nha|ọnọ|nọd| nc| al|n ụ|ị m| us|nọ |u ọ|nch| o |eta|n u| ot|otu|sir|sịr| nh|a k|ali|o m| ag| gb|e s|ọta|nwa|ị n|lit|ega|ji |ọdụ|e k|ban|e g|ị k|esi|agb|eme|hu |ikp|zu |pe |nta|na‐|chọ|u a|a b|uch|n ọ|onw|ram|kwụ|ekọ|i e| nọ| ug|ọch|u m|gwu|a h|zụz|ugw|meg|ị e|nat|e h|dịg|o y|kpu|pụr|cha|zụ |hịc|ich| ng|ach| og|wap|wan|ịgh|uwa| di| nn|i ị",
    "ceb": "sa | sa|ng |ang| ka|an | pa|ga | ma|nga|pag| ng|a p|on |kat|a k|ug |od | ug|g m| an|ana|n s|ay |ung|ata|ngo|a m|atu|ala|san|ag |tun|g s|g k|god|d s|a s|ong|mga| mg|g p|n u|yon|a a|pan|ing|usa|tan|tag|una|aga|mat|ali|g u|han|nan| us|man|y k|ina|non|kin| na|syo|lan|a b|asa|nay|n n|a i|awa| ta|taw|gaw|nsa|a n|nas| o |ban|agp|isa|dun|was|iya| gi|asy|adu|ini|bis| ad|ili|o s| bi|g a|nah|nag|a t| ki|lin|lay|ahi|sam|al |wal| di|nal|asu| ba|ano|agt| wa|ama|yan|a u| iy|kan|him|n k|gan|ags|n a|kag| un|ya |kas|gpa|g t| su|aha|wha|agk|awh|gka|a g|kal|l n|gla|gsa|sud|gal|imo|ud |d u|ran|uka|ig |aka|aba|ika|g d|ara|ipo|ngl|g n|uns|n o|kau|i s|y s|og |uta|d n|li | si|gik|g i|mta|ot |iin| la| og|o a|ayo|ok |awo|aki|kab|aho|n m|hat|o p|gpi|a w|apa|lip|ip | hu| ga|a h|uba|na | ti|bal|gon|la |ati|wo |ad |hin|sal|gba|buh| bu| ub|uha|agb|hon|ma |nin|uga|t n|ihi| pi|may| pu|mak|ni | ni|d a|pin|abu|agh|ahu|uma|as |dil|say| in|at |ins|lak|hun|ila|mo |s s|sak|amt|o u|pod|ngp|tin|a d|but|ura|lam|aod|t s|bah|ami|aug|mal|sos|os |k s| il|tra| at|gta|bat|aan|ulo|iha|ha |n p| al|g b|lih|kar|lao|agi|amb|mah|ho |sya|ona|aya|ngb|in |inu|a l| hi|mag|iko|it |agl|mbo|oon|tar|o n|til|ghi|rab|y p| re|yal|aw |nab|osy|dan",
    "tgl": "ng |ang| pa|an |sa | sa|at | ka| ng| ma|ala|g p|apa| na|ata|pag|pan| an| at|ay |ara|ga |a p|tan|g m|mga| mg|n n|pat| ba|n a|aya|na |ama|g k|awa|kar|a k|lan|rap|gka|nga|n s|g n|aha|g b|a a| ta|agk|gan|tao|asa|aka|yan|ao |a m|may|man|kal|ing|a s|nan|aga| la|ban|ali|g a|ana|y m|kat|san|kan|g i|ong|pam|mag|a n|o a|baw|isa|wat| y |lay|g s|y k|in |ila|t t| ay|aan|o y|kas|ina|t n|ag |t p|wal|una|yon| o | it|nag|lal|tay|pin|ili|ans|ito|nsa|lah|kak|any|a i|nta|nya|to |hay|gal|mam|aba|ran|ant|agt|on |t s|agp| wa| ga|gaw|han|kap|o m|lip|ya |as |g t|hat|y n|ngk|ung|no |g l|gpa|wa |lag|gta|t m|kai|yaa|sal|ari|lin|a l|pap|ahi| is| di|ita| pi|pun|agi|ipi|mak|a b|y s|bat|yag|ags|o n|aki|tat|pah|la |gay|hin| si|di |i n|sas|iti|a t|t k|mal|ais|s n|t a|al |ipu|ika|lit|gin| ip|ano|gsa|alo|nin|uma|hal|ira|ap |ani|od |i a|gga|y p|par|tas|ig |sap|ihi|nah|ini| bu|ngi|syo|o s|nap|o p|a g| ha|uka|a h|aru|a o|mah|iba|asy|li |usa|g e|uha|ipa|mba|lam|kin|kil|duk|n o|iga| da|dai|aig|igd|gdi|pil|dig|pak| tu|d n|sam|nas|nak|ba |ad |lim|sin|buh|ri |lab|it |tag|g g|lun|ain|and|nda|pas|kab|aho|lig|nar|ula| ed|edu| ib|git|ma |mas|agb|ami|agg|gi |sar|i m|siy|g w|api|pul|iya|amb|nil|agl|sta|uli|ino|abu|aun|ayu| al|iyo",
    "hun": " sz| a |en | va|és | és|min|ek | mi| jo|jog|ind|an |nek|sze|ság| az|gy |sza|nde|ala|az |den|a v|val|ele| el|oga|mél|egy| eg|n a|ga |zab| me|zem|emé|aba|int|van|bad|tel|tet| te|ak |tás|ény|t a| ne|gye|ély|tt |n s|ben|ség|zet|lam|meg|nak|ni | se|ete|sen|agy|let|lyn|s a|yne|ra |z e|et | al|mel|kin|k j|eté|ok |tek| ki|vag|re |n m|oz |hoz|ez |s s|ett|gok|ogy| kö|mbe|es |em |nem|ely| le|ell|emb|hog|k a|atá|köz|nt | ho|yen|hez|el |z a|len|dsá|ásá|tés|ads|k m| ál| em|a s|nte|a m|szt|a t|áll|ás |y a|ogo|sem|a h|enk|nye|ese|nki|ágo|t s|lap|ame|ber|ló |k é|nyi|ban|mén|s e|i m|t m| vé|lla|ly |ébe|lat|ág |ami|on |mze|n v|emz|fel|a n|lő |a a|eki|eri|yes| cs|lle|tat|elő|nd |i é|ég |ésé|lis|yil|vet|át |kül|ért| ke|éte|rés|l a|het|szo|art|alá| ny|tar|koz| am|a j|ész|enl|elé|ól |s k|tár|s é|éle|s t|lem|sít|ges|ott| fe|n k|tko|zás|t é|kel|ja | ha|aló|zés|nlő|ése|ot |ri |lek|más|tő |vel|i j|se |ehe|tes|eve|ssá|tot|t k|olg|eze|i v|áza|leh|n e|ül |tte|os |ti |atk|zto|e a|tos|ány|ána|zte|fej|del|árs|k k|kor|ége|szá|t n| bi|zat|véd|nev|elm|éde|zer|téb|biz|rra|ife|izt|ere|at |ll |k e|ny |sel| né|ába|lt |ai |sül|ház|kif|t e| ar|leg|d a|is |i e|arr|t t|áso|it |ető|al | má|t v| bá|bár|a é|esü|lye|m l| es|nyo",
    "azj": " və|və |ər |lar| hə|in |ir | ol| hü| bi|hüq|üqu|quq|na |lər|də |hər| şə|bir|an |lik| tə|r b|mal|lma|ası|ini|r h|əxs|şəx|ən |arı|qla|a m|dir|aq |uqu|ali| ma|una|ilə|ın |yət| ya|ara|ikd|əri|ar |əsi|əti|r ş|rin|yyə|n h| az|dən|nin|ərə|tin|iyy|mək|zad| mü|sin| mə|ni |nda|ət |ndə|aza|rın|ün |ını|ə a|i v|nın|olu|qun| qa| et|ilm|lıq|ə y|ək |lmə|lə |kdi|ind|ına|olm|lun|mas|xs |sın|ə b| in|n m|q v|nə |əmi|n t|ya |da | bə|tmə|dlı|adl|bər| on|əya|ə h|sı |nun|maq|dan|inə|etm|un |ə v|rlə|n b|si |raq| va|ə m|n a|ınd|rı |anı| öz|əra|nma|n i|ama|a b|irl|ala|li |ins|bil|ik | al| di|ığı|ə d|lət|il |ələ|ə i|ıq |nı |nla|dil|müd|n v|ə e|unm|alı| sə|xsi|ə o|uq |uql|nsa|ətl| də|ili|üda|asi| he|ola|san|əni|məs| da|lan| bu|tər|həm|dır|kil|iş |u v| ki|min|eyn|mi |yin| ha|sos|heç|bu |eç | ed|kim|lığ|alq|xal| as|sia|osi|r v|q h|rə |yan|i s| əs|daf|afi| iş|ı h|fiə| ta|ə q|ıql|a q|yar|sas|lı |ill|mil|əsa|liy|tlə|siy|a h|məz|tün|ə t| is|ist|iyi| so|n ə|al |ifa|ina|lıd|ı o|ıdı|əmə|ır |ədə|ial| mi|əyi|miy|çün|n e|iya|edi| cə| bü|büt|ütü|xil|üçü|mən|adə|t v|a v|axi|dax|r a|onu| üç|seç| nə| se|man|ril|sil|əz |iə |öz |ılı|aya|qan|i t|şər|təm|ulm|rəf|məh| xa|ğın| dö| ni|sti|ild|amə|qu |nam|n o|n d|var|ad |zam|tam|təh",
    "ces": " pr| a |ní | ne|prá|ráv|ost| sv| po|na |ch |ho | na|nos|o n| ro|ání|ti |vo |neb|ávo|má |bo |ebo| má|kaž| ka|ou |ažd| za| je|dý |svo|ždý| př|a s| st|sti|á p| v |obo|vob| sp|bod| zá|ých|pro|rod|ván|ení|né |ý m|ého| by| ná|spo|ně |o p|mi |í a|ter|roz|ová|to | ja| li|áro|nár|by |jak|a p|a z|ny | vš|kte|i a|lid|ím |o v|í p|u p|mu |at | vy|odn| so| ma|a v| kt|í n|zák|li |oli|ví |kla|tní|pod|stá|en |do |t s|mí |je |em |áva| do|byl| se|být|í s|rov| k |čin| ve|ýt |í b|it |dní|vše|pol|o s| bý|tví|nýc|stn|nou|ejn|sou|ran|ci |vol|se |nes|a n|pří|eho|ným|tát|va |ním|mez|ají|i s|stv|ké |ích|ečn|žen|e s|vé |ova|své|ým |kol|du |u s|jeh|kon|ave|ech|eré|nu | ze|i v|o d|í v|hra|ids|m p|ému|ole|y s| i |maj|o z| to|aby|sta| ab|m a|pra| ta|chn| ni|že |ovn|ako|néh|len|dsk|rac|lad|chr| že|vat| os|sob|aké|i p|smí|esm|st |i n|m n|a m|lně|lní|při|bez|dy |áln|ens|zem|t v|čen|leč|kdo|ými| ji|oci|i k| s |í m|jí | či|áv |ste|och| oc|vou|ákl| vz|rav|odu|nez|inn|ský|nit|ivo|a j|u k|iál| me|ezi|ské|ven|stu|u a|tej|oln|slu|zen|í z|y b|oko|zac|níc|jin|ky |a o|řís|obe|u v|tak|věd|oje| vý|ikd|h n| od|čno|oso|ciá|h p| de|a t|ům |soc|jíc|odů|něn|adn|tup|dů |děl|jno|kéh|por|ože|hov|aci|nem|é v|rok|i j|u o|od |ího|vin|odi",
    "plt": "ny |na |ana| ny|y f|a n|sy |aha|ra |a a| fa|n n|y n|a m|an | fi|tra|any| ma|han|nan|ara|y a| am|ka |in |y m|ami|olo| ts|lon|min| mi| sy| na|a t| ol|fan| ha|a i|man|iza| iz|ina|ona|y h|aka|o a|ian|a h|reh|etr|a s|het|on |a f|ire|fah|tsy|mba| ar| hi|zan|ay |ndr|y o|ira|y t| an|ehe|o h|afa|y i|ren|ran| zo|ena|amb|dia|ala|amp|zo |ika| di|tan|y s|y z| az|ia |m p|rin|jo |n j| jo| dr|zy |ry |a d|ao |and|dre|haf|nen|mpi|rah| ka|eo |n d| ir|ho |am |rai|fa |elo|ene|oan|omb| ta| pi| ho|ava|azo|dra|itr|iny|ant|tsi|zon|asa|tsa| to|ari|ha |a k|van|n i|fia|ray| fo|mbe|ony|sa |isy|azy|o f|lal|ly |ova|lom| vo|nat|fir|sam|oto|zay|mis|ham|bel| ra|a r|ban|kan|iha|nin|a e|ary|ito| he| re| no|ita|voa|nam|fit|iar| ko|tok|isa|fot|no |otr|mah|aly|har|y v|y r| sa|o n|ain|kam|aza|n o|oka|ial|ila|ano|atr|oa | la|y l|eri|y d|ata|hev|sia|pia|its|reo| ao|pan|anj|aro|tov|nja|o s|fam|pir| as|ty |nto|oko|y k|sir|air|tin|hia|ais|mit|ba | it| eo|o t|mpa|kon|a z|a v|ity|ton|rak|era|ani|ive|mik|ati|tot|vy |hit|hoa|aho|ank|ame|ver|vah|tao|o m|ino|dy |dri|oni|ori| mo|hah|nao|koa|ato|end|n t| za|eha|nga|jak|bar|lah|mia|lna|aln|va | mb|lan| pa|aov|ama|eve|za |dro|ria|to |nar|izy|ifa|adi|via|aja| va|ind|n k|idi|fiv|rov|vel",
    "mad": "an |eng|ban|ng | sa| ka|dha| ba|ren|ak |ang| se| ha|hak| dh|na | pa|se |adh|a s|aba|n s|ara|ngg|are|ha |aga|sa | or|ore|asa|sar|ana| ma|aan|a k|ale|gi | ag|gad|a b|n o|n k|eba|ala|ra |gan| ke|dhu|ota|aja|bas|n b|ka |man|tab|dhi|beb|sab|ama|ako|abb|at |ggu|nga| ta|pan|wi |huw|uwi|eka|ata|a d|san| ot|agi|lak|hal|ba |bba|i h|ong|em |kab|g a|lem|a o| pe| na|ane|par|ngs|nge|gar|a a|tan|gsa|a p|ran|i s|k h|n p|uy |guy|ken|n a|al |ada| ga|apa|pon|e d| e |nek| an|g s|ta |kaa|on |kal|a m|ssa|ona|abe|kat| la|a e|e e|sal|ate|jan|ri |nan|lab|asi|sad|i p|e a|lan|aka|a h|ari| bi|ena|si |daj| ng|ton|e k|har|oss|gen|i k|g k|car|ase|ano|era|kon| be|nya|n d|nag|bad|ar |epo| da|mas| kl| al|n t|mat|nos|n n|ela|g e|a n|k k|uwa|adi|pad|ggi|uan|i d|ne | so|hi |sae|oan|wan|as |le |gap|ter|yat|om |kla|k a|e b|ina|ah |k s|koa|i a|ega|neg|n h|m p|aha| as| ja|abi|ma |kas|bi | mo|aon| di|one| ep|per|aya|e s|nto|te |bat|epa|nda|n e| ca|int|pam|di |ann| ra|aen|k d|amp|a t|nta|and|e p|rga|pen|yar|mpo|ste|dra|ok |oko|ila|g p|k b|i b|set|to |isa|nao|nna|n m|ett| a |bis|hid|bin|i m|nas| ho|kar|t s| po|dil| to|aju|ika|kom|arg|ant|raj|a l|das|tto|ost|mos|lae|ga |rek|idh|tad|hig|en |rny|arn|ndh|eta|adu| dr|jat|jua|gam",
    "nya": "ndi|ali|a k|a m| ku| nd|wa |na |nth| mu| al|yen|thu|se |ra |nse|hu |di |a n|la | pa|mun| wa|nga|unt| la|a u|u a|e a|ons|za | ma| lo|iye|ace|ce |a l|idw|ang| ka|kha|liy|ens|li |ala|ira|ene|pa |i n|we |e m|ana|dwa|era|hal|ulu|lo |ko |dzi| ci|yo |o w|iko|ga |a p|chi| mo|lu |o l|o m|oyo|ufu| um|moy|zik| an|ner|and|umo|ena| uf|dan|iri|ful|a a|ka |to |hit|nch| nc|a c|ito|fun|dwe| da|kuk|wac| dz|e l|a z|ape|kap|u w|e k|ere|ti |lir| za|pen|tha|aye|kut|mu |ro |ofu|ing|lid| zo|amu|o c|i m|mal|kwa|mwa|o a|eza|i p|o n|so |i d|lin|nso| mw|iro|zo | a |ati| li|i l|a d|ri |edw|kul|una|uti|lan|a b|iki|i c|alo|i k| ca|lam|o k|dza|ung|o z|mul|ulo|uni|gan|ant|nzi| na|nkh|e n|san|oli|wir|tsa|u k|ome|ca |gwi|unz|lon|dip|ipo|yan|gwe|pon|akh|uli|aku|mer|ngw|cit| po| ko|kir|mba|ukh|tsi|bun|iya|ope|kup|bvo|han| bu|pan|ame|vom|ama| ya|siy| am|rez|u n|zid|men|osa|ao |pez|i a| kw| on|u o|lac|ezo|aka|nda|hun|u d|ank|diz|ina|its|adz| kh|ne |nik|e p|o o|ku |phu|eka| un|eze|mol|ma | ad|pat|oma|ets|wez|kwe|kho|ya |izo|sa |o p|kus|oci|khu|okh|ans|awi|izi|zi |ndu|iza|no |say| si|i u|aik|jir|ats|ogw|du |mak|ukw|nji|mai|ja |sam|ika|aph|sid|isa|amb|ula|osi|haw|u m| zi|oye|lok|win|lal|ani| ba|si | yo|e o|opa|ha |map|emb",
    "qug": "una|ta | ka|na |ka |ash|cha|a k|ari|ish|kun|kta|ana|pak|hka|shk|apa|mi |ach|hay|akt|shp|man|ak | ch| ha|rin|ata|tak|lla|ita|ami|ama|aku|har| pa|pas|ayñ|yñi|ina| ma| ru|uku|sh |hpa|run|all|kuy|aka|an | tu|tuk|yta|chi|chu|a c|ñit|in |nak|a h|nka|ris|tap|kan| ki|ayt|pi | sh|pa |i k|a p|nap|kam|kaw|pay|nam|ayp|aws|iri|wsa|a s|ank|nta|uy |a t|hin|a m|ay | li|ant|lia|kay|nat|a r|shi|iak|lak|uya| wa|yuy|say|kis|y r|ypa|hun|a a| yu|n t|tam| ti|yay|n k| ya|a w|hpi|lli| al|api|yku|un |ipa|a i|iku|ayk|shu| sa|ush|pir|ich|kat|hu |huk| il|ill|kas|a y|rik|yac|a l| ku|kac|hik|tan|wan|ypi|ink|ika| ni|ila|ima|i c|yll|ayl| wi|mac|nis| ta|i y|kus|tin|n s|i p|yan|llu|la |iks|tik|kpi| pi|awa|may|lan|li | ri|kll|yas|kin|kak|aya|ksi|k h|aym|war|ura| ay|lat|ukt|i t|iya|ull|mas|sha|kir|uch|h k|nch|akp|uma|pip|han|kik|iki|riy|aki| ii|i s|n p|h m|kar|nal|y h|tac| su|nac|mak|n m|nki|k a|mam|iwa|k t|k k|i m|yma| ña|wil|asi|nmi|kap|pal|sam|pam|k i|k l|i i|pan|sum|i w| hu|his| mu|iia|mun|k m|u t|pik|was|ik |ma |hat|k r|akl|huc| im|mal|uyk|imi|n y|anc|y k|a n|iñi| iñ|wak|unk|yka| mi|iña|a u|has|ywa| ak|llp|ian|ha |tar|rmi|i a|arm|las|ati|pur|sak|ayw|hap|yar|uti|si |iyt|uri|kim| ar|san|h p|akk|iy |wat|wpa|y i|u k",
    "kin": "ra | ku| mu|se |a k|ntu|nga|tu |umu|ye |li | um|mun|unt|a n|ira| n |ere|wa |we | gu|mu |ko |a b|e n|o k|e a|a u|a a|u b|e k|ose|uli|aba|ro | ab|gom|e b|ba |ugu| ag|omb|ang| ib|eng|mba|o a|gu | ub|ama| by| bu|za |ihu|ga |e u|o b| ba|kwi|hug|ash|ren|yo |ndi|e i| ka| ak| cy|iye| bi|ora|re |gih|igi|ban|ubu| nt| kw|di |gan|a g|a m|aka|nta|aga| am|a i|ku |iro|i m|ta |ka |ago|byo|ali|and|ibi|na |uba|ili| bw|sha|cya|u m|yan|o n| ig|ese|no |obo|ana|ish|kan|sho| we|era|ya |aci|wes|ura|i a|uko|e m|n a|o i|kub|uru|hob|ber|ran|bor| im|ure|u w|wo |cir|gac|ani|bur|u a|o m|ush| no|e y| y |rwa|eke|nge|ara|wiy|uga|zo |ne |ho |bwa|yos|anz|aha|ind|mwe|teg|ege|are|ze |n i|rag|ane|u n|ge |mo |u k|bul| uk|bwo|bye|iza|age|ngo|u g|gir|ger|zir|kug|ite|bah| al| ki|uha|go |mul|ugo|n u|tan|guh|y i| ry|gar|bih|iki|atu|ha |mbe|bat|o g|akw|iby|imi|kim|ate|abo|e c|aho|o u|eye|tur|kir| ni|je |bo |ata|u u| ng|shy|a s|gek| ru|iko| bo|bos|i i| gi|nir|i n|gus|eza|nzi|i b|kur| ya|o r|ung|rez|ugi|ngi|nya| se|mat|eko|o y| in|uki| as|any|bis|ako|gaz|imw|rer|bak|ige|mug|ing|byi|kor|eme|nu | at|bit| ik|hin|ire|kar|shi|yem|yam| yi|gen|tse|ets|ihe|hak|ubi|key|rek|icy| na|bag|yer| ic|eze|awe|but|irw| ur|fit|ruk|ubw|rya|uka|afi",
    "zul": "nge|oku|lo | ng|a n|ung|nga|le |lun| no|elo|wa |la |e n|ele|ntu|gel|tu |we |ngo| um|e u|thi|uth|ke |hi |lek|ni |ezi| ku|ma |nom|o n|pha|gok|nke|onk|a u|nel|ulu|oma|o e|o l|kwe|unt|ang|lul|kul| uk|a k|eni|uku|hla| ne| wo|mun| lo|kel|ama|ath|umu|ho |ela|lwa|won|zwe|ban|elw|ule|a i| un|ana|une|lok|ing|elu|wen|aka|tho|aba| kw|gan|ko |ala|enz|o y|khe|akh|thu|u u|na |enk|kho|a e|zin|gen|i n|kun|alu|mal|lel|e k|nku|e a|eko| na|kat|lan|he |hak| ez|o a|kwa|o o|ayo|okw|kut|kub|lwe| em|yo |nzi|ane|obu| ok|eth|het|ise|so |ile|nok| ba|ben|eki|nye|ike|i k|isi| is|aph|esi|nhl|mph| ab|fan|e i|isa| ye|nen|ini|ga |zi |fut| fu|uba|ukh|ka |ant|uhl|hol|ba |and|do |kuk|abe|za |nda| ya|e w|kil|the| im|eke|a a|olo|sa |olu|ith|kuh|o u|ye |nis| in|ekh|e e| ak|i w|any|khu|eng|eli|yok|ne |no |ume|ndl|iph|amb|emp| ko|i i| le|isw|zo |a o|emi|uny|mel|eka|mth|uph|ndo|vik| yo|hlo|alo|kuf|yen|enh|o w|nay|lin|hul|ezw|ind|eze|ebe|kan|kuz|phe|kug|nez|ake|nya|wez|wam|seb|ufa|bo |din|ahl|azw|fun|yez|und|a l|li |bus|ale|ula|kuq|ola|izi|ink|i e|da |nan|ase|phi|ano|nem|hel|a y|hut|kis|kup|swa|han|ili|mbi|kuv|o k|kek|omp|pho|kol|i u|oko|izw|lon|e l| el|uke|kus|kom|ulo|zis|hun|nje|lak|u n|huk|sek|ham| ol|ani|o i|ubu|mba| am",
    "swe": " oc|och|ch |er |ing|för|tt |ar |en |ätt|nde| fö|rät|ill|et |and| rä| en| ti| de|til|het|ll |de |om |var|lig|gen| fr|ell|ska|nin|ng |ter| ha|as | in|ka |att|lle|der|sam| i |und|lla|ghe|fri|all|ens|ete|na |ler| at|ör |den| el|av | av| so|igh|r h|nva|ga |r r|env|la |tig|nsk|iga|har|t a|som|tti| ut|ion|t t|a s|nge|ns |a f|r s|män|a o| sk| si|rna|isk|an | st|är |ra | vi| al|t f| sa|a r|ati| är| me| be|n s| an|tio|nna|lan|ern|t e|med| va|ig |äns| åt|sta|ta |nat| un|kli|ten| gr|vis|äll| la|one|han|änd|t s|stä|t i|ner|ans|gru| ge|ver| må| li|lik|ihe|ers|rih|r a| re|må |sni|n f|t o| mä| na|r e|ri |ad |ent|kla|det| vä|run|rkl|da |h r|upp|dra|rin|igt|dig|n e|erk|kap|tta|ed |d f|ran|e s|tan|uta|nom|lar|gt |s f| på| om|kte|lin|r u|vid|g o|änn|erv|ika|ari|a i|lag|rvi|id |r o|s s|vil|r m|örk|ot |ndl|str|els|ro |a m|mot| mo|i o|på |r d|on |del|isn|sky|e m|ras| hä|r f|i s|a n|nad|n o|gan|tni|era|ärd|a d|täl|ber|nga|r i|enn|nd |n a| up|sin|dd |örs|je |itt|kal|n m|amt|n i|kil|lse|ski|nas|end|s e| så|inn|tat|per|t v|arj|e f|l a|rel|t b|int|tet|g a|öra|l v|kyd|ydd|rje| fa|bet|se |t l|lit|sa |när|häl|l s|ndr|nis|yck|h a|llm|lke|h f|arb|lmä|nda|bar|ckl|v s|rän|gar|tra|re |ege|r g|ara|ess|d e|vär|mt |ap ",
    "lin": "na | na| ya|ya |a m| mo|a b|to | ko| bo|li |o n| li|i n| pe|i y|a y|a n|ngo|ki | ba| ma|kok|pe |la |a l|zal|oki|ali|nso|oto|ala|ons|so |mot|a k|nyo|eng|kol|go |nge| ny|yon|o e|ang|eko|te |o y|oko|olo|ma |iko|a e|e m|e b|lik|ko |o a|ako|ong| ye|mak|ye |isa| ek|si |lo |aza|sal|ama| te|bat|o p|oyo|e n| az|a p|ani|sen|o m|ela|ta |amb|i k|ban|ni | es|yo |mi |mba|osa| oy|aka|lis|i p|eli|a t|mok|i m|ba |mbo| to| mi|isi|bok|lon|ato|ing|o b| nd|ota|bot| ez|ge |nga|eza|o t|nde|ka |bo |gel|kan|e k|lam|sa |ese|koz| po|den|ga |oba|omb|oli|yan|kop|bon|mos|e e|kob|oka|kos|bik|lin|po |e a| lo| bi|kot|‘te|ngi|sam| ‘t|omi|e y|ti |i b| el|elo|som|lok|esa|gom|ate|kam|i t|ika|a s|ata|kat|ati|wa |ope|oza|iki|i e| ka|bom|tal|o l|bek|zwa|oke|pes| se|bos|o o|ola|bak|lak|mis|omo|oso|nza| at|nda|bal|ndi|mu |mob|osu|e t|asi|bis|ase|i l|ele|sus|usu|su |ozw|and|mol|tel|lib|mbi|ami| nz|ne |ene|kel|aye|emb|yeb|nis|gi |obo|le |kum|mal|wan|a ‘|pon| ep|baz|tan|sem|nya|e l| ta|gis|opo|ana|ina|tin|obe| ti|san| ak|mab|bol|oku|u y|mat|oti|bas|ote|mib|ebi|a o|da |bi | mb|lel|tey|ibe|eta|boy|umb|e p|eni|za |be |mbe|bwa|ike|se | et|ibo|eba|ale|yok|kom| en|i a|mik|ben|i o| so|gob|bu |son|sol|sik|ime|eso|abo| as|kon|eya|mel",
    "som": " ka|ay |ka |an |uu |oo |da |yo |aha| iy|ada|aan|iyo|a i| wa| in|sha| ah| u |a a| qo|ama| la|hay|ga |ma |aad| dh| xa|ah |qof|in | da|a d|aa |iya|a s|a w| si| oo|isa|yah|eey|xaq|ku | le|lee| ku|u l|la |taa| ma|q u|dha|y i|ta |aq |eya|sta|ast|a k|of |ha |u x|kas|wux| wu|doo|sa |ara|wax|uxu| am|xuu|inu|nuu|a x|iis|ala|a q|ro |maa|o a| qa|nay|o i| sh| aa|kal|loo| lo|le |a u| xo| xu|o x|f k| ba|ana|o d| uu|iga|a l|yad|dii|yaa|si |a m|gu |ale|u d|ash|ima|adk|do |aas| ca|o m|lag|san|dka|xor|adi|add| so|o k| is|lo | mi|aqa|na | fa|soo|baa| he|kar|mid|dad|rka|had|iin|a o|aro|ado|aar|u k|qaa| ha|ad |nta|o h|har|axa|quu| sa|n k| ay|mad|u s| ga|eed|aga|dda|hii|aal|haa|n l|daa|xuq|o q|o s|uqu|uuq|aya|i k|hel|id |n i| ee|nka| ho|ina|waa|dan|nim|elo|agu|ihi|naa|mar|ark|saa|riy|rri|qda|uqd| bu|ax |a h|o w|ya |ays|gga|ee |ank| no|n s|oon|u h|n a|ab |haq|iri|o l| gu|uur|lka|laa|u a|ida|int|lad|aam|ood|ofk|dhi|dah|orr|eli| xi|ysa|arc|rci|to |yih|ool|kii|h q|a f| ug|ayn|asa| ge|sho|n x|siy|ido|a g|gel|ami|hoo|i a|jee|n q|agg|al | di| ta|e u|o u| ji|goo|a c|sag|alk|aba|sig| mu|caa|aqo|u q|ooc|oob|bar|ii |ra |a b|ago|xir|aaq| ci|dal|oba|mo |iir|hor|fal|qan| du|dar|ari|uma|d k|ban|y d|qar|ugu| ya|xay|a j",
    "hms": "ang|gd |ngd|ib | na|nan|ex |id | ji|ad |eb |nl |b n|d n| li|ud |jid| le|leb| ga|ot |anl|aot|d g|l l|b l| me|ob |x n|gs |ngs|mex|nd |d d| ne|jan|ul | ni|nja| nj| gu| zh|lib|l n|ong| gh|gao|b j|b g|nb |l g|end|gan| ad| je|jex|ngb|gb |han|el | sh| da|ub |d j|d l|t n| nh|nha|b m|is |d z|x g| ya|oul|l j| wu|she|il |nex| ch|b y|d s|gue|gho|uel|wud|d y| gi|d b|hob|nis|s g| zi| yo|lie|es |nx |it |aob|gia|ies| de|eib|you| ba| hu|ian|zib|d m|s j|oud|b d|chu|ol |ut | do|t j|nen|hud|at |s n|hen|iad|ab |enl| go|dao| mi|t g|zha|b z|enb|x j| ze|eit|hei|d c|nt |b s| se|al | xi|inl|hao| re| fa|d h|gua|yad|ren| ho|anb|gx |ngx|ix |nib|x z|and|b h|b w|fal| xa|d x|t l|x m|don|gou|bao|ant|s z|had|d p|yan|anx|l d|zhe|hib| pu|ox | du|hui|sen|uib|uan|lil|dan|s m| di| we|gha|xin|b x|od |zhi|pud| ju| ng|oub|xan| ge|t z|hub|t h|hol|t m|jil|hea|x l| ma|eud|jul|enx|l z|l s|b a| lo| he|nga|d r|zen| yi|did|hon|zho|gt |heb|ngt|os |d a|s l|aos| si|dei|dud|b b|geu|wei|d w|x c|x b|d k|dou|l h|lou| bi|x a|x d|b c| sa|s a| bo|eut|blo| bl|nia|lol|t w|bad|aod| qi|ax |deb| ja|eab| nd|x s|can|pao| pa|gl |ngl|che|sat|s y|l m|t s|b f|heu|s w| to|lia| ca|aox|unb|ghu|ux | cu|d f|inb|iel| pi|jib|t p|x x|zei|eul|l t|l y|min|dad",
    "ilo": "ti |iti|an |nga|ga | ng| pa| it|en | ka| ke| ma|ana| a | ti|pan|ken|agi|ang|a n|a k|aya|gan|n a|int|lin|ali|n t|a m|dag|git|a a|i p|teg|a p| na|nte|man|awa|kal|da |ng |ega|ada|way|nag|n i| da|na |i k|sa |n k|ysa|n n|no |a i|al |add|aba| me|i a|eys|nna|dda|ngg|mey| sa|pag|ann|ya |gal| ba|mai| tu|gga|kad|i s|yan|ung|nak|tun|wen|aan|nan|aka| ad|enn| ag|asa| we|yaw|i n|wan|nno|ata| ta|l m|i t|ami|a t| si|ong|apa|kas|li |i m|ina| an|aki|ay |n d|ala|gpa|a s|g k|ara|et |n p|at |ili|eng|mak|ika|ama|dad|nai|g i|ipa|in | aw|toy|oy |ao |yon|ag |on |aen|ta |ani|ily|bab|tao|ket|lya|sin|aik| ki|bal|oma|agp|ngi|a d|y n|iwa|o k|kin|naa|uma|daa|o t|gil|bae|i i|g a|mil| am| um|aga|kab|pad|ram|ags|syo|ar |ida|yto|i b|gim|sab|ino|n w| wa| de|a b|nia|dey|n m|o n|min|nom|asi|tan|aar|eg |agt|san|pap|eyt|iam|i e|saa|sal|pam|bag|nat|ak |sap|ed |gsa|lak|t n|ari|i u| gi|o p|nay|kan|t k|sia|aw |g n|day|i l|kit|uka|lan|i d|aib|pak|imo|y a|ias|mon|ma | li|den|i g|to |dum|sta|apu|o i|ubo|ged|lub|agb|pul|bia|i w|ita|asy|mid|umi|abi|akd|kar|kap|kai| ar|gin|kni| id|ban|bas|ad |bon|agk|nib|o m|ibi|ing|ran|kda|din|abs|iba|akn|nnu|t i|isu|o a|aip|as |inn|sar| la|maa|nto|amm|idi|g t|ulo|lal|bsa|waw|kip|w k|ura|d n|y i",
    "uig": "ish| he|ini|ing|nin|gha|ng |ili| we|we |sh |in | bo|quq|oqu|ni |hoq| ho|ush|shi|lik|qil|bol|shq|en |lis|qa |hqa|n b|hem| qi|ki |dem|iy | ad|ade|igh|e a|em |han|liq|et |ge |uq |nda|din| te| bi|idi|let|qan|nli|ige|ash|tin|ha |kin|iki|her|de | er| ba|and|iti|olu|an | dö|döl|aq |luq| ya|me |lus|öle|mme|emm| qa|daq|rki|lgh|erq|erk|shk|esh|rqa|iq |uqi|ile|rim|i w|er |ik |yak|aki|ara|a h| be|men| ar|du |shu|uql|hri|hi |qlu|q h|inl|lar|da |i b|ime| as|ler|etl|nis| öz|ehr|lin|e q|ar |ila| mu|len| me|qi |asi|beh|a b|ayd|q a|bir|bil| sh|che|rli|ke |bar|hke|yet|éli|shl|tni|u h|ek |may|e b| ké|h h| ig|ydu|isi|ali|hli|k h| qo|iri|emd|ari|e h|ida|e t|tle|rni| al|siy|lid|olm|iye|anl| tu|iqi|lma|ip |mde|e e|tur|a i|uru|i k|raw|hu |mus|kil| is|i a|ir |éti|r b|özi|ris|asa|i h|sas| je|he | ch|qig|bas|n q|alg|ett|les| xi|tid| él|tes|ti |awa|ima|nun|a a| xe| bu|hil|n h| xa|adi|dig|anu|uni|mni| sa|arl|rek|ére| hö|kér| ji|min|i q|tis|rqi| iy|elq|xel|p q| qe|y i|i s|lig| ma|iya|i y|siz|ani| ki|qti| de|q w|emn|met|jin|niy|i i|tim|irl| ti|rin|éri|i d|ati|si |tew|i t|tli|eli|e m|rus|oli|ami|gen|ide|ina|chi|dil|nay|ken|ern|n w| to|ayi| ij|elg|she|tti|arq|hek|e i|n a|zin|r a|ijt|g b|atn|qar|his|uch|lim|hki|dik",
    "hat": "ou |an | li|on |wa |yon| po|li |pou|te | yo|oun| mo|un |mou|ak | na|en |n p|nan|tou|syo| dw| to|yo | fè|dwa| ak| ki|ki | pa| sa|out| la| ko| ge|ut |n s|gen| de|se |asy|èt |i p|n d| a | so|n l|a a|fè |n k| se|pa |e d|u l| re|ite|sa | ch|kon|n n|e l|t p|ni |cha|a p|nn |ans|pi |t m| ka| an|nm |fèt|i s|son|man| me|n m|n a|e p|swa|sou|e k|hak|òt |n y|men|i l|epi| pe|ote|san| ep|i k| si|yen|eyi|a l| ap|i a|yi |pey|je |n t|e a|k m|e s| ni|lib|e n|i t|lit|ran|lè |enn|al |a s| pr|a f|ns | lò|ap |lòt|enm|k l|n e|t l|kla|anm|e y|a k| ma|e t|ay |i m|ali| lè|è a|ye |a y|ant| os| ba|i g| tè|aso|u t|a n| pw|ras| pè|n f|nas|ka |n g|osw| ta|dek|i d|pwo|e m| di| vi|la |i n|u s|sos|bli| te|o t| tr|lwa|ète|a t|le |u y|i f|tan|a c|lar|a m|ete|ara|t k| pi|ibè|bèt|re |osy|de |ati|ke |res|tis|i y|tè |nen| fa|ekl|ze |nal|ons|ksy|ini|che| le|e r|a d| en|aye|he |o p|alw| kò|lal| no|esp|a g|ava|kou|las|way|u f|isy| za| ok|oke|kal|ken|sye|ta |onn|k k|nje|pra|van|esi|pès|kot|ret|sya|n v|lek|jan|ik |a b|eks|wot|è n|di |òl |tra|u k|i r|nou| as|k a|u d|ist|èso|ib | ne|iti|ti |is |y a|des|è l|a r|ont| ke|nsa|pat|rit|sit|pòt|ona|ab |è s| sw|ond|ide| ja|rav|t a|ri |bon|viv| sè|pre|vay|k p|l l|kòm|i o| ra|era|fan|dev",
    "aka": "sɛ |a a| sɛ|ne |ra |a n| wɔ| a |ara|an |eɛ |no | ne| bi| no| as|iar|bia|yɛ |mu |aa | an|ɛ s|e a|ma | ho|bi |man|deɛ| mu|ho |ɛ a|na |a ɛ| ob|obi|e n|a b|n a|so |o n|pa |ama|ɛ o|o a|ipa|nip|ɛ n|naa| na|a w|ana| so| ad| nn|ɛ ɔ|ɛde|asɛ|kwa| on|oni|wan| am|a ɔ|sɛd|wɔ | ah|ɛyɛ| ny|oɔ | n |mma|i a| mm|nni| kw|ie |wɔn|ɛ w|de | ɛy| ba|ase|ɔ n|o b|i m|ɔ a|uo |n n|a m|o s|iri| yi|ni |e s|nyi|di |u n|a o|aho| de|tum| ɛn|ɔn |nya|i n|ɔma|e m|adw| yɛ|umi|die|mi |ɛ ɛ|o k| ab|ɛm |a s| ma|nam| ɔm| ɛs|yin| at| bɔ|o d|ina|pɛ |sɛm|ua |n s|bɔ |adi|ya |e h|aso|mar|ani|kuo|rɛ |fa |a k|ɔde|a h|ba |n b|re |uma|wum|om |ɔ h|m n|yi |u a| sa|se |dwu|ɔ b| nt|m a|erɛ| kɔ|a y|orɔ| nk| bɛ| ɔd|ten|rɔ |hyɛ|saa|ka |ɛ b|e b|i s|ade|am |nka|kor|i ɛ|ene|ena| ns|ban|ɛns| ku|ɛsɛ|ane|nsɛ|fof|ɛɛ | fi|gye|ɔtu| di|ano|i k|o m| ɔt| ko|yɛɛ|bir| ak|im |kye| pɛ|a d|yie|ko |nti|i b|ete|ofo|amm|ye |ri |foɔ|kɔ |bom|abo|ɔ s|ɔne| ɛb|soɔ|for|isɛ|m k|asa|nod|ɛ m|fir|ti | da|e y|sua| be|nii|seɛ|wa |ber| aw|dwe|n f| fo|o ɛ|i h|u b|ɔ m| mf|hɔ |kab|wɛ |to |rib|hwɛ|ibi| dw|dis|nso|ans|tir|u ɛ| ti| hɔ|sa |e o| tu|odi|ɛ y|ia |ofa| ɔn|o w|ɛbɛ|aba| ka|ii |wen|ɛsi|m m|sia|ada|yer|ian|da |set| gy|dua|i d|som|mfa|ɔ w| af|i y|any|ora|rim|wɔd|dwa|nsi",
    "hil": "nga|ang| ka|ga |ng | sa|an |sa | ng| pa| ma|ag |on |san|pag| an|ung|kag|a p|n s|a k|n n|a m|ata|kat| ta|gan|g p|ay |tar|g k|ags|run|ala|aru|gsa|tag|a s|g m| mg|mga|n k|a t|od |kon|g s|a n|ing|a i|man|g t|agp|tan| si|n a|y k|mag|gpa|may|hil|pan|ya |ahi|la |g a|sin|gin|ina|aya|ana|ili| pu|han|g i|yon|nan| in|way|uko|gka| gi|aha| uk|ilw|lwa|asa|apa|kas|syo|at |ban|lin|iya|kah|n p| na|o n|lan|a a|in |ngk|g n|ini|aba|pat|pun|a g|ali|o s| iy|yan|agt|tao|ngs|gba|kab|wal|ngo|al |nag|agk|o m|ni |i s|aga|ano| wa|isa|abu|kal|a h|dap|ong|a d|mat| tu|gso|no |aho|aki|sod|agb| da|asy|ila|d k|pas| hi|agh|d s|n m|na |lal|yo |di |til| la|o k|s n|non|gay|sal|a b|god|ao |ati|aan|uha| is|ka |aka|asu|ngb|o a|ama|ato|atu|uga|paa|but|una|n u|bah|uan|iba| di| ba|pah|bat| du|ulo|os |y s|nah| ko|aag|agi|sil|gi |i m|hay|yag|gon|y n|sta|n d|ot |oha|tun|ida| pr| su|a l|uta|m s| al|do |uli|sug|n t|as |lon|sul|og |pam|pro|him|gua|alo|lig| bi|bis|asi|ula|ton|ksy|gtu|a e|k s| ib|n b|maa|ugu|ko |lib|ron|i a|hi |hin|tek|lab|abi|ika|mak|bot|aoh|ok | hu|ghi|ind|ote|tok|i n|t n|g e|eks|dal|uma|ubo|tum|hat|to |ado|kin| ed|rot|ho |ndi|inu|ibu|y a|nta|ad |gko|lah|duk|abo|iko|nda|aro|gal|mo |g o| bu|int| o |n o|aay|da |gsu",
    "sna": "wa |a k|ana|ro |na | ku| mu|nhu|dze|hu |a m| zv|mun|oku|chi|a n|aka|dzi|ka |zer|ero| ch|che|se |unh|odz|rwa|ra |kod|zvi| ne| pa|kan| we| dz| no|ika|va |iri| an|kut|nyi|o y|yik|van|nek|ese|eko|zva|idz|e a| ka|ane|ano|ngu|eku|cha|ung| yo|ri |ake|ke |ach|udz|iro|a z|u w| va|ira|wes|ang|ech|nge|i p|eng|yok|nok|edz|o i|irw|ani|ino|uva|ich|nga|ti |zir|anh|rir|ko |dza|o n|wan|wo |tan|sun|ipi|dzw|eny|asi|hen|zve|kur|vak|a p|sha|unu|zwa|ita|kwa|e k|rud|nun|uru|guk|a c|a d| ya|a y|bat|pas|ezv|ta |e n|uti| kw|o k|o c|o m|ara| ma|si |ga |uko|ata|ose|ema|dzo|uch|hip|kuv|no |rus|hec|omu|i z|wak|o r|kus|kwe|ere|re | rw| po|o a|mwe|yak|mo |usu|isi|za |sa |e z|uta|gar| in|hin|nem|pac|kuc|we |ete| ye|twa|pos|o d|a i|hur|get|ari|ong|pan|erw|uka|rwo|vo | ak|tem|zo |emu|emo|oru| ha|uit|wen|uye|kui| uy|vin|hak|kub|i m|a a|kud| se| ko|yo |and|da |nor|sin|uba|a s|a u| ic|zvo|mut|mat|nez|e m|a w|adz|ura|eva|ava|pi |a r|era|ute|oko|vis| iy|ha |u a|han|cho|aru|asa|fan|aan|pir|ina|guv|ush|ton| hu|uny|enz|ran|yor|ted|ait|hek| ny|uri|hok|nen|osh| ac|ngi|muk|ngo|o z|azv|kun|nid|uma|i h|vem|a h|mir|usa|o p|i n|a v|i k|amb|zan|nza|kuz|zi |kak|ing|u v|ngw|mum|mba|nir|sar|ewo|e p|uwa|vic|i i|gwa|aga|ama|go |yew|pam",
    "xho": "lo |lun|oku|nge|elo|ntu|tu |e n|ele| ku|nye|ye |nga|ung|la | ng|lek|a n|o n|yo |o l|e u|nel|gel|a k|ko |ho |ulu|ke | ne| na|lul|we |le |wa |ngo| kw|ule|kub| no|a u|onk| um|nke|o e| lo|ela|kun|ama|any|unt|ang|eko|uba|elu|ezi|mnt| wo|a i|eyo|alu|lel|umn|lwa|kwe|olu|ba | uk|kuk|won|ukh|une|uku|gok|nok|enz| un|khu| ok|the|e k|zwe|kan|eki|aph|ane|uny|ile|o z|aku|ley|lok| ez|het|eth|ath|oka|pha|sel|ala|o y|kul|akh|kil|enk| in|esi|o k| yo|use|hul|u u|tho|obu|wen|ana|nku|khe|o o|e a|na |kho|ban|a e|ise|ent|gan|uth|ni |kel| zo|he |izw|o w|hi |elw|nam|ing|eli|fun|za |lwe|eng|ya |kwa|fan|isa|o a|ndl|ntl|ayo|eni|gen|hus|uhl|iph|tha|nzi|isw|sa |phi|aba|ben|und|ume|thi|ha |alo|ka |ink|hla|lal|wan|i k| lw|i n|bel| ba|o u|azi|e o|swa|ngu|bal|pho| ab|man|kut|emf|e i|mfa|a a|e e|een|int|uph|eka|ebe|seb|lan|nee|zi |o i|mal|sha|sek|dle|ziz|mth|nen|zel| se|okw|tya|ike|lin|tla|ene|sis|ima|ase|yal|ubu| ak|ant|sen|olo|wak| ko|a o|mfu|ezo|sid|nay|oko| ub|ulo|zo |do |isi|wez|iso|han|nte| ph|zim| ya|ga |li | le|iba|ham|ube|kup|aza|jik| ul| en|eem|phu| ol|and|imf| es|o s| im|kuf|u k|kwi|nak|ma |nan|ety|kuh|kus|yol| am|hel|idi| so|lis| nj|nje|jen|tsh|aka|zin|kuz|‐ji|no |ufu|ale|ong| el|bo |a y|e l|men|yen|lum",
    "min": "an |ak |ang| ma| da| ka| sa|ara| ha|yo |nyo|hak| ba|ran|dan|man|nan|ng | pa| di|kan|ura| na|ata|asa|ok |nda|ala| pu|pun|uak|ntu|n d|k m| ti|ah |o h|n s|k u|n k| ur| un|tua|n b|and|unt| ta|uny|n p|tio|iok|ama|pan|ek |ban|jo |n m|k h|k d|ado|nga|aan|g p|tan|aka|ind|at |dak|dap|o p|tau|pek|uan| at|amo|mar|ape|au |kat|mo |sas|ari|asi|di |o s|ia |ngg|bas|ika|sam|am |lia|o d|san|gan|sia|tar|n n| jo| su|anu|lam|gar|o t| in|par|sua|dek|sar|k s|ri |o m|ana|bat|asu|ko |ai | la|ant|dal|lak|aga|alu|iah|o u|n a|tu |k a|adi|rad|i m|mal|dok|usi|aku|i d|k k|al |aro|eka|neg|ega|ato|to | ne|mam|o b|eba|ian|beb|n u|um |si |aba|rat|uah|ro |mas|ila|a d|ali|uka|ard|kam|ti |atu|nus|dar|ami|n t|sa |in |amp|kal|car|lan|aha|kab|so |rde|un |i k|gsa|das|ngs|aca|yar|ka |ati|ar | an|uku|ras| ko|sya|mat|k n|aya|nta|lo |any|sur|kaa|dil|kar|o a|u d|k t|pam|dia|ra |iba|lai|i t|lah| bu|mpa|kum|abe|n h|ili|nny| as|u p|aki|amb|sac|as |k b|h d|uli|ajo|a n|raj|n i|dua|ndu|k p|i p|itu|lin|han|huk|o k|rik|a b| li|ik |ggu|jam|bai|a a|i a|nia| ad|i j| hu|gam|sal|aso|ngk|sad|apa|ann| mu|ony|dik|bad|ain|did|min|l d|ada|bul|rga|tin|ga |ani|alo| de|arg|ahn|sio|hny|n l|sti|awa|uju|per|bak| pe|tik|ans| pi|a s| um|bag|ndi|anj|mba",
    "afr": "ie |die|en | di| en|an |ing|ng |van| va|te |e v|reg| re|n d| ge|ens|et |e r|e e| te| be|le |ver|een| in|ke | ve| he|eg |het|lke|lik|n h|de |nie|aan|t d|id |men| vr|nde|eid|e o| aa|in |of |der|hei|om |g v| op| ni|e b| el|al |and|elk|er | me|ord|e w|g t| to| of|ers| we| sa| vo|ot |erk|n v|vry|ge |kee|asi|tot| wa|sie|ere| om|aar|sal|dig|wor|egt|gte|rdi|rd |at |nd |e s|ede|ige| de| ’n|n a|eni| wo|e g| on|n s|’n |e t|erd|ns |oor|bes|ond|se |ska|aak|nig|lle|yhe|ryh|is |eli|esk|ien|sta|vol|ele|e m| vi|ik |r d|vir|edi|kap|g e|ir |es |sy |ang|din| st|ewe|gem|gel|g o| is|el |e i|op |ker|ak |uit|ike|nse|hie|ur |eur| al|e a|nas|e n|nge|ier|n o|wer|e d|ap | hu|ale|rin| hi|eme|deu|min|wat|n e|s o| as| so|as |e h|del|d v|ter|ten|gin|end|kin|it | da| sy|per|re |n w|ges|wet|ger|e k|oed|s v|nte|s e|ona|nal|waa|d t|ees|soo| ma|d s|ies|tel|ema|d e|red|ite| na|ske|ely|lyk|ren|nsk|d o|oon|t e|eke|esi|ese|eri|hul| gr|ig |sio|man|rde|ion|n b|n g|voo|hed|ind|tee| pe|rso|t v|s d|all|n t|rse|n i|eem|d w|ort|ndi|daa|maa|t g|erm|ont|ent|ans|ame|yke|ari|n m|lan|voe|n ’|nli|rkl|r m|sia|ods|ard|iem|g s|wee|r e|l g|taa|sek|bar|gti|n n|lin|sen|t o|t a|raa|ene|opv|pvo|ete| ty|arb| sl|igh|dee|g a|str|nsl|sel|ern|ste",
    "lua": "ne |wa | ne|a m| ku|a k| mu|di | bu|a b| di|e b|tu |nga|bwa|ntu| bw|udi|a d|e m|i b| ba| ma|shi|adi|u b|a n|la |ons|mun|i n|ung|nsu|ga |yi |ya |na |unt| dy|idi|e k|buk|mu |ika|esh|su |u m|ku |nde|any| bi|lu |nyi|end|yon|dik|ba | ci| ka|ang|u n|u y| mw|ka |i m| yo|we |oke|tun|de |kes|hi |kok|mwa| kw|e n|ban|dya|sha|u d|ken|kwa|ji |ha |wen|dit| ud|a a| an|mwe|itu| pa|le | a | wa|nji|kan|kum|ibw|bwe|a c|ant|ena|yen|mba|did|e d|ala|u u|ish|mak|bul|i a|nda|enj|u a|ila|pa |ako|ans|uke|ana|nso|amb|hin|umw|kal|uko|i k|bad|aka|ela|ele|u w|u k|du |ja |bu | mi|ind|ndu|kwi| ns|mbu|atu|bud|dil|ile|sun|eng|ula|enz|nan|nsh|kad|alu| cy|bis|kud|lon|u c|gan|dib|da |dye|bid| by|ukw|i d|aa |ngu|a p|sam|isa| aa|ilu| na|aba|lel|ye |dim|cya|kub|so |ond|kus|mat|nge|e c| bo|aku|bak|mus|ta |umb|ulo|elu|man|iki|mon|ngi|abu|mud|kuk|omb| mo|und|diy|kwe|umu|mal| ke|ush|gil|uba|imu|dis|wil|wu |san|gad|uka|bon|ma |aci|mik|wik| me|pan|iku|nza|ben|ulu|ifu|iba|kak|ata|som|ong|e a|apa| tu|o b|umo|bya|utu|uja|yan| be|ke |akw|ale|ilo|uku|cil|tup|kul|cik|kup|upe|bel|amw|ona| um|iko|awu|and|za |ike|a u|ima|muk| ya|mum|me |map|ita|iye|ole|lum|wab|ane| lu|nu |kis|mbe|kab|ine|bum|lam|pet| ad|fun|ama| mb|isu|upa|ame|u p|ubi",
    "fin": "en |ise|ja |ist| ja|on |ta |sta|an |n j|ais|sen|n o|keu|ike|oik|lis| va|ell|lla|n t|uks| on|ksi| oi|n k| ka|aan|een|la |lli|kai|a j| ta|sa |in |mis| jo|a o|ään|än |sel|n s|kse|a t|a k|tai|us |tta|ans|ssa|kun|den|tä |eus|nen|kan|nsa|apa|all|est| se|eis|ill|ien|see|taa| yh|jok|n y|vap|a v|ttä|oka|n v|ai |itt|aa |aik|ett|tuk|ti |ust| ku|isi|stä|ses| tä| tu|lai|n p|sti|ast|n e|n m|tää|sia|unn|ä j|ude|ä o|ste|si |tei|ine|per|a s|ia |kä |äne| mi|maa| pe|a p|ess|a m|ain|ämä|tam|yht| ju|jul|yks|hän|ä t| hä|utt|ide|et |llä|val|sek|stu|n a|lä |ami|hmi| ke|ikk|lle|iin|sä |euk|täm|ihm|tee| ih|lta|pau| sa|isk|mää|ois|un |tav|ten|dis|hte|n h|iss|ssä|a h|ava| ma|a y| ei| te| si| ol|ekä|sty|alt|toi|att|oll|tet| jä| ra|vat| mu|iel| to|mai|sal|isu|a a|kki|at |suu|n l|väl|ää |uli|tun|tie|eru| yk|etu|vaa|rus|muk| he|ei |a e|kie|sku|eid|iit| su|nna|sil|oma|min| yl|lin|aut|uut|sko| ko|tti|le |sie|kaa|a r| ri|sii|nno|eli|tur|saa|aat|lei|oli|na | la|oon|urv|lma|rva|ite|mie|vas|ä m| ed|tus|iaa|itä|ä v|uol|yle| al|lit|suo|ama|joi|unt|ute|i o|tyk|n r|ali|lii|nee|paa|avi|omi|oit|jen|kää|voi|yhd|ä k| ki|eet|eks| sy|ity|ilö|ilm|oim|ole|sit|ita|uom|vai|usk|ala|hen|ope| pu|auk|pet|oja|i s|rii|uud|hdi|äli|va | om",
    "run": "ra |we |wa | mu|e a|se | n |a k|ira|ntu|tu | ku| um|ko |a i|mu |iri|mun|hir|ye |unt|ing|ash|ere|shi|a n|umu|zwa| bi|gu |ege|a a|za |teg|ama|e k|go |uba|aba|ngo|ora|o a|ish| ba| ar|ung|a m| we|e n|na |sho|ese|nga| ab|e m|mwe|ugu| kw|ndi| gu|ate|kwi|wes|riz|ger|u w| at|di |gih|iza|n u|ngi|ban|yo |ka |e b|a b| am| ca|ara|e i|obo|hob|ri |u b|can|nke|ro |bor| in|bah|ahi|ezw|a u|gir|ke |igi|iki|iwe|rez|ihu|hug|aku|ari|ang|a g|ank|ose|u n|o n|rwa|kan| ak|nta|and|ngu| vy|aka|n i|ran| nt| ub|kun|ata|i n|kur|ana|e u| ko|gin|nye|re | ka|any|ta |uko|amw|iye| zi|ga |ite| ib|aha| ng|era|o b|ako|o i| bu|o k|o u|o z| ig|o m|ho |mak|sha| as| iv|ivy|n a|i b|izw|o y| uk|ubu|aga|ba |kir|vyi|aho| is|nya|gan|uri| it| im|u m|kub|rik|hin|guk|ene|bat|nge|jwe|imi| y |vyo|imw|ani|kug|u a|ina|gek|ham|i i|e c|ze |ush|e y|uru|bur|amb|ibi|agi|uza|zi |eye|u g|gus|i a| nk|no |abi|ha |rah|ber|eme|ras|ura|kiz|ne |tun|ron| zu|ma |gen|wo |zub|w i|kor|zin|wub|ind| gi|y i|ugi|je |iro|mbe| mw|bak| ma|ryo|eka|mat| ic|onk|a z| bo|ika|eko|ihe|ukw|wir|bwa| ry| ha|bwo| ag|umw|yiw|tse| ya|he |eng| ki|nka|bir|ant|aro|gis|ury|twa| yo|bik|rek|ni | ah| bw|uro|mw |tan|i y|nde|ejw| no|zam|puz|ku |y a|a c|bih|ya |mur|utu|eny|uki|bos",
    "slk": " pr| a |prá|ráv| po|ie |ch |ost| ro|ho | na|vo |ani|na | ne|nos|ažd|kto|kaž| ka|má |né |ávo|om | má|ebo|ti | v | al|ale|leb|bo | je| za|ých|o n|ždý|dý |ia | sl|mi |ova|sti|nie|van|to |eni|ne |áva|lob|ého|slo|rod|tor|rov| sp| zá|á p|o v|a p| kt|ý m| sv|voj|bod|obo|nia| ná| vy|ej |je |ať |o p|a v|a s|áro|a z| sa| ma|a n|e a|e s|mu |mie|kla|nár|svo|spo| by|ovn|by |roz|sa |ľud|iť |odn| vš|ov |i a|néh|vše|o s|va |o a| ľu|oci|pre|nu |a m|u a|ený|e v|ný |nes|a k|zák|pod|ným| do|u p| k |u s|áci|ajú|byť|yť |nýc|eho|ran|pol|tát|stn|jeh|a r|šet|ými|lad|čin|ému|a o|edz|ť s|kon|stv|oré| sú| ni|e z|pri|och|ny |štá|sť |oje|vna|tre|u k| či|ko |é p|maj|smi|a a|etk|nak|ým |med|dov|prí| ob|iu |uds|osť|esm|e b|m a|hra|i s|rác|bez|vať|chr|e p| ab|jú | št|žen| ho|čen| de|i p|ť v| vo|dsk|pro|nom| in|ou |du |že |aby|est| bo|ré |bol| so|nú |olo|kej|áln| oc|obe|ky |dzi|dom|áv |por|lne|rav|aké|ens|pra|ok | že|tné| ta|ako|res| vz|i k|ami| tr| ak|ní |len|o d|del|ský|cho|ach|ivo|h p|ože|iál|inn|slu|kra|loč|očn|ju | os|anu|oju|voľ|ákl|str|é s|ené| ži|niu|sta| st|ved|tvo| me|dno|m p|de |ké |kým|ikt|stu|é v|i v|vyh| to|v a|odu|hoc|a t|ím |ly |hov|y s|soc|júc|ú p|odi|vod|liv|aní|ciá| ve|rej|ku |ci |ske|sob|čno|oso",
    "tuk": "lar| we|we | bi|yň |ary|ada|da | he| ha|an |yny|kla|dam|de | ad|yna|er |na | ýa|ir |dyr|iň |bir|r b|ydy|ler|ara|am |yr |ini|lan|r a|kly|lyd| öz|mag|nyň|öz |her|gyn|aga|en |ryn|akl|ala|dan|hak|eri|ne |uku|ar |r h|ga |ny |huk| de|ili|ygy|li |kuk|a h|nda|asy|len| ed|bil|atl|ine|edi|niň|lyg| hu| ga|e h|nde|dil|ryň|aza|zat|a g|‐da|a‐d|eti|ukl| gö|ly | bo|tly|gin| az|lma|ama|hem|dir|ykl|‐de|e d|ile|ýan|a d|ýet|ýa‐|ynd|lyk|aýy|e a|ünd|ge | go|egi|ilm|sy |ni |etm|em‐|lme|m‐d|aly|any| be|tle|syn|rin|y b|let|mak|a w|a ý|den|äge|ra | äh|mäg| du|n e|bol|meg|ele|ň h| et|igi|ň w|im |iýa| ýe| di|r e|ek | ba|ak |esi|ril|a b|in |p b|deň|etl|agy| bu| je|bu |e ö|y d| hi|mez| es|ard| sa|ähl|e b|yly| ka|esa|mek| gu|n a|e t|lik| do|e g|sas|ill|nma|ň a|ram|ola|hal|y w|ýar| ar|anm|mel|iri|siý|ndi|ede|gal|end|mil|rla|göz| ma|n b|e ý|öňü|ňün|n h| tu|hiç|yýe| ge|my |iç | öň|n ý|tla|ň ý|lin|rda|al |lig|gar| mi|i g|dal|rle|mal|kan|gat|tme|sin|and|ň g|gor| ta|öwl|ýle|y g|e w|ora|tiň|ekl| yn|alk|döw| dö|ere|m h| me|dur| er|asi|tut|at |çin|irl|umy|eli|erk|nme|wle|gur|a ö|aýa| çä|nun| ki|ras|aml|up |ýaş|tyn| aý|ry |ň d|baş|ip |gi |z h|kin|z ö|n w|ter|inm|eýl|i ý|kim|nam|eň |beý|dol| se| te|r d|utu|gyý|ez |umu|mum",
    "dan": "er |og | og|der| de|for|en |et |til| fo| ti|ing|de |nde|ret| re|hed|il |lig| ha|lle|den| en|ed |ver|els|und|ar | fr| me|se |lse|and|har|gen|ede|ge |ell|ng |at | af|nne|le |nge|e f|ghe|e o|igh|es |af |enn| at|ler| i |ske|hve|e e|r h|ne |enh|t t|ige|esk| el| be|ig |tig|fri|or |ska|nin|e s|ion| er|nhv|re |men|r o|e a| st|ati| sk| in|l a|tio| på|ett|ens|al |tti|med|r f|om |end|r e|del|g f|ke | so|på |eli|g o| an|r r|ns | al|nat|han| ve|r s|r a| un| he|t f|lin| si|r d|ter|ere|nes|det|e r| ud|ale|sam|ihe|lan|tte|rin|rih|ent|ndl|e m|isk|erk|ans|t s|kal| na|som|hol|lde|ind|e n|ren|n s|ner|kel|old|dig|te |ors|e i| hv|sni|sky|ene|vær| li| sa|s f|d d|ers|ste|nte|mme|ove|e h|nal|ona|ger| gr|age|g a|vil|all|e d|fre|tel|s o|g h|t o|t d|r i|e t| om|arb|d e|ern|r u| væ|d o|res|g t|klæ|øre|n f| vi| må|ven|sk | la|gte|kab|str|n m|rel|e b|run|rbe|bej|t i|ejd|kke|t e|g d|rkl|ilk|gru|ved|bes| da|nd | fu|lær|æri|rdi|ærd|ld |t m|dli|fun|sig| mo|sta|nst|rt |od | ar| op|vis|igt|ære|tet|t a|emm|g e|mod|rho|ie |g u|ker|rem| no|n h| fa|rsk|orm|e u|s s|em |d h| ge|ets|e g|g s|per| et|lem| tr|i s|da |dre|n a|des|dt |kyt|rde|ytt|eri|hen|erv|l e|rvi|ffe|off|isn|r t| of|ken|l h|rke|g i|tal|må |r k|lke|gt |t v|t b",
    "als": "të | të|dhe|he | dh|në |ë d|e t| e |et |ë t|imi|për|ejt|dre|rej| pë| dr| në|it |gji|sht|ve |jit|ë p| gj|ith| sh| i | li|het|e p| nj|t t|ër |ë n|in | ve|me |jtë|e n| ka|ara|e d|ush|n e|tet| pa|jer|hku|a t|re |ën |ë s|sh | ku|së |t d|ë m|kus|mit|lir|ka |ë k|jë |se | si| që| ba|etë|që |ë b|si |ë g|eri|thk|nje|eve|e k|e s|jet|ose|bas|ohe| os|ra | mb|iri|h k|min|shk|ash|rim|ndë| nd|një|jta|e m| me|eti|do | du|es |rë |e l|mi |anë|tar|t n| as|dër|hte|end|tën|vet|uar|und|ësi|kom|tje|duh|ndi|at |ave| ko|ri |ta |ë v|shm| de|ar |omb|i d| kë|i p|jes| ng|uhe|nga|i n|en |ë e|ga | ar|e a|ës |hme|bar| pe|htë|ë l|ur |ë i|isë|ime|sim|ris|tës|art|ëm |cil|tim|tyr|ësh| ma|shë|or |t a|kët|gje| ci|r n|e v|par|nuk|ëta|rgj|i i|ish|uk | nu|ë r|are| je|ë c| pu|atë|lim|lli| ës|ë a|i t|mar|ore| së|tit|lar|per|t p|rat|ite|inë|t s|riu|ke |ërg|a n|edh| pr|esi|irë|ërk| po|hë |ë j|i s|a e|ht |mba|roh|im |ari|e b|lit|ti |asn|tav|snj|t e|ik |tij|k d|qër|hëm|ras|res|otë|nal|mun| an|kla|ven|e q|tat|t i| fa|ij | tj|igj|te |ali|bro| di|roj| ti|uri|ojë|ë q|çdo|det|n p| pl|ekl|ind|erë|vep|dek|nim|ive|ror|sho|hoq|oqë|ëri|pri|r d|shp|esë|le |a d|shi| mu|dis|r t|ete| t |ë f|ëzo|zim| çd|mbr| re|e f|jen|i m|iut|n k|tha|s s|lot",
    "nob": "er | og|og |en | de|for|til|ing|ett| ti|et | ha| fo| re|ret|il |het|lle|ver|tt |ar |nne| en|om |ell|ng |har| me|enn|ter|de |lig| fr| so|r h|ler|av |le |den|and| i | er|som| å |hve|or |t t|ne | el|els|re | av|se |esk|enh|nge|ska|nde|e o|ete|gen|ke |lse|ghe|ten|men| st|r s|fri|igh|ig | be|e e|nhv|r r|tte|ske|te | på| ut| sk|al | in|sjo|på |der|e s|ner|rin|jon|t o|unn|e f|han|asj|tig|ed |es |g f|sam|ent|tti|ene|nes|med|ge | al|r o|ens|r e|eli|isk|lin| ve|nin|g o| sa| an|t f|itt|lik|end|kal|r f|t s|rih|ihe|nas|nte|e r|ns | si|lan|g s|mme|ige|l å|erk|dig| gr|n s|ren|r a|all| na|kte|erd|ere|e m|und|r u|res|tel|ste|gru|inn|lær|ers| un|det|t e|arb|ale|del|ekt|ven|t i|g e|bei|eid|e a|n m|e d| ar|rbe|e g| bl|ans|klæ| li| he|g t|æri|sky|run|rkl| la|sta|sni|kke|m e|rt |mot| mo|e n|tat|at |e h|e b|ove|e t|jen|t d|str| må|r m|n e|ors|rel|ker| et|n a|bes|one| vi|nn |g r|e i|kap|sk |ot |ndi|nnl|i s| da|s o| no|id |ger|g h|vis|n o|bar|s f|ndl|t m|g a|opp|t a|dis|nal|r d|per|dre|ona|ære|rdi|da |ute|nse|bli|ore|tet|rit| op|kra|eri|hol|old| kr|ytt|kyt|ffe|emm|g d|l f| om|isn| gj|å d|ser|r b| di| fa|n t|r k|lt |set| sl|dom|rvi|me |l e|gre|å s|må | tr|nd |m s|g i|ikk|n h| at|tes|vil|dli|g b|d d| hv|rav",
    "suk": "na | mu| bu| na|a b|ya |hu |a n|we | gu|nhu|a g| ba|a m|ili|wa | ya|li |unh| bo|mun|ali|bul|han|bo |i m|ilw|uli|ang|lil|la |i b|e n|ga | wi|kil|mu | al| se|u a|ge |kge|ekg|sek|lwe|ose|le |lo |bi |ulu|e y|kwe|ila|and|e b|i n|yo |ng’|a s|nga| ns|si |abi|nsi|ina|lin|aki|se |ban| ly| gw|dak|lu |ngi|gil|a w|o g|akw|u b|ile|anh|ka |ilo|a l|ubi|e g| nu|o n|ja |gan| ng| ma|lya|nul|g’w|ani|ndi|u m|iya|wiy| ji|jo | ka|yab|lwa|ada|o b|e k| ad|gwi|ho |gub| ku|ing|o a|o l|ula|ika|a i|u n|dik|iha|shi|ayo|gun| ja|ha |biz|o j|lag|ma |wen| sh|ele|ung|o s|gi |gul|mo |lan|iwa|a k|ala|iki|jil|ola|ji |a a|yak| li|nil|iza|agi|aha|man|bos|iga|kuj| ha|ana| lu| gi|iti| mh|uga|uyo|win| ga|za |a y|ki | nd|oma|ene|o w|a u|mah|yos|sol|hay| mi|iko|ong|aga|iku|gwa|i a|ndu|pan|u g|e i| ab|ujo|ida|nya|ibi|duh|but|i y|u w|iji|nhy| we|nik|aya|uhu|nda| il|je |abo|aji|lel|ubu|nay|ba |lug|lon|ale|mil|da |a j|dul|o m|mha|aka|e u|g’h|udu|lyo|e m|e a|gik|bus|bal|sha|wit|twa|ngh|nek|wig| um|okw|any|uma|ima|uso|bud|’we| ij|hil|bil|a h|imo|ita|no | ih|gut|nha|ne |iso|ulo|uno|yom|’ha|u l|elo|eki|wel|hya|ngu|omb|som|mbi|i g|o i|u i|bak| is|ugu| yi|utu|eni|tum|umo|u s|tog|inh|’wi|lit|waj|e j|ule|jiw|u u|kub|kul|lik|uto| uy|upa",
    "sag": "tî | tî|na | na| ng|a n|ngb|gö |ngö|nga|nî | lo|lo |zo |bi |la |gbi|ang| sô|sô |î l|gan|ö t| zo|o n| wa|a t|îng|i t|ngü|gü | al|lîn| nd|a l|ê t| kû|äng|î n| te|wal|ala|alî|î k|ë t|î m|â t|î â|ô a|î b| mb|ûê |gâ |örö|ngâ|kûê| lê|o k|a â|e n|ko |î s| kö|ter|dör|köd|ödö|ï n|a k|lêg|gë |ôko|ëpë|mû |pëp| pë|o a|êgë|eke|yek|ke |ü t|î t| ay|o t|bên|ê n|rê |pëe|ra |ëe |erê|rö |tï |kua|aye| nî| ôk|ua |a z|ä t| âl|â n|ïng|î d|ö n|âng|ênî| am|î z|ten|âla| yâ|ê a|mbê|a m|û n|a y|ne |ene|rä |î g|a s|bê | ku|arä|ndi|ga |diä|ëng|iä | du| ân|amû|dut|öng|yâ |utï|ro |önî|lï |a p| gï|oro|lë |î a| âm|ndo| sê|ngô|do |i n|o s|ndö|âra|e t| bê|gba|ûng| mä|sâr| sï|î p| gb|ö k|e a|yê |a a| âk|dö |ara|ba |ï t| tö|a w|zar|tön|î w|war|ndâ|a g|ana|në |ênd| të|ta |ban| lë|zön|î f|nzö| sâ|sï |tën|o w| nz|sên| âz| da| za|îrî| në|nën|ate|ä s|bâ | at|o l|ënë|o ô|fa | kp| ma|o p| mû|kân|a b|bat|ata|ô n|se | kâ|alë| ko|ông|da |ë s|üng|ë n|ibê|rös|mbë|bët|ëtï|âmb|mbâ|ïgî|mba|gî |tän| po|bûn|gï |amb|ü n|gbï|ôi |gôi| af|rë |erë|lê | as|afa|âzo|i p|sor| ad|i s| ba|gïg|ä n|bät|dë |ö â|kûe|ûe |kpä|päl|älë|e z|ätä|ö w|ngi| yê|köt|ötä|tä |ê s|kod| hï|hal|hïn|lëz|ëzo|ngä|gän|odë|ö m|mar|sär|pä |ärä|îan|rän|bîa|a h|gi |bor|du ",
    "nno": " og|og | de| ha|er |en |ar |til| ti|lle|ett|il |ret|om |et | re|le |har|enn| me| al|all| fr|ne |tt |re | å | i |nne|and|ing|ska| sk|men| fo|det|den|ver|for|ell|t t|dom| so|de |e s| ve| ei|ere| på|al |an |e o|e h|fri|sam| sa|l å|på |leg| el|ler|som|ein|ei |nde|av | st|dei|or |ten|esk|kal|gje|n s|tte|je |ske|rid|r r|i s|te |nes| gj|eg |ido|med|e f|r s|st |ke |jon| in|r f|sjo|asj|nas|ter|unn|ed |kje|han|ona| er|t o|t e|g f|ski|e m|ast|ane|e t| av| gr|lan|ste|tan|å f| na|der| sl|t s|seg|n o|r k|nga|ge | an|g o|at |na |ern|nte|ng | ut|lik|e a|bei|gru|e i|arb|kil|g s|lag|eid|r a|e d|g d| si| få|ame|a s|e r|rbe|jen|n m|r d|n e|nn |e n|erd| tr| må| bl| mo|ren|run|nin|bli|kra| kr| at|ege|n i|me |nsk|ins|år |frå|in |lov|v p|end|mot|ale|e v|å a|få |rav|int|nal| ar|sta|e k|t f|ome| la|ot |t a|sla| ik|nle|itt| li| kv|id |kkj|ikk| lo|nad|å v|tta| fa| se|gen|ld |å s|kan|g t| ka|r l|god|n a|lin|jel|ild|dig|ha |l d|kap|ve |ndr|g i|g a|inn|var|rna|r m|r g|a o|dre|d a|n t|ag |kår|mål|ig |va |i d|t m|e e|n d|tyr| om|g e|eve|då |e u| då|und| no|ir |gar|g g|l h|se |ga |d d|l f|ker|r o|å d|eld|ige|t d|t i|t h|oko|nnl|rel|nok|rt |lt |åse|jer|ta |ik |ial|eig|r p|i e|olk|bar|osi|kte|sos|lir|opp| un|ad | be",
    "mos": " n |ẽn| a | se|a t|sẽ|̃n | ne|a s| ye|e n| ta| tɩ|n t| pa|tɩ | la| so|nin| ni| b | fã|fãa|ãa |ng |a n| bu| tõ|la |ẽ | te|tõe|ne |ye |a a|or | ya| to|ed |ned|pa |e t|õe |tar|em |tẽ|g n|ã n|n m|aan| ma|sor|buu|n y|maa|uud|a y|r n|ins|n p|ud |ra |paa|ɩ n|a b| wa|d f| na|me |n d|ara|n b|sã |taa|n w|bã |an |yel|eng|aal|ɩ b|n n|gẽ|̃ng|og | ka| bɩ|bɩ | tʊ|gã | yɩ|na |am |e b|ame|wa |g a|d b|aam|ab |mb | bã|ãmb| ba|m n|wã |aab|a m|aa |saa|ga |nsa|yaa| wã|a l|tog|ore|n s|nd |ʊʊm| sõ| sã|ãng|seg|egd|d s|el |tʊʊ|ngã|ba | tũ| da|ã t| me|b s|re |dat|l s|d n|ɩ y|ã y|dɩ |aoo|g t| kã|m t|ing|r s|a p|b y|b n|gdɩ|men|dã |vɩɩ| vɩ|lg |oor|ã s|n k|al |rã |nga|ar | le|gr |d a|neb|̃nd|ɩɩm|ĩnd|yɩ |lem| pʊ| bʊ|pʊg|nge|to |b t|ɩ s|g s| mi| ke|a k|bãm| we|kao|ilg|wil| zĩ| no|kẽ| ra|m b|ʊge|b k| bũ|oog|ã p|bũm|ngr|at | wi|gam| ko|eb |g b|sõn|ãad|ã f|õng|ɩm |m s| yi|ũmb| yã|ʊm |oy |wẽ|noy|ʊmd|da |ren|a z|ya | gã|le |b p|ɩ t|n g| f |ni |soa|oab|i t| sɩ|lag| ti|te |o a|s n|oga|go |tũ |gem|age|a w|̃ n|in | yõ|a g|b b|aor|ka |ẽe|tũu|aas|a r|e y|ag |eg |r t|e a|ã k|iid|e p|neg|o t|ate|oa |e s|ũ n|mã |ms |ell|eem|ẽm|b w|̃ms|too|ik | zã|zĩn|kog|bao|r b|s a|bui|uii|ogl|aba|alo|loa|kãa|od |l b|ll |nda|kat|aka",
    "cat": " de| i |es |de |la | la| a | pe|per|ió |ent|tat| se|nt |ret|ts |dre|at | el|ls | dr|men|aci|a p|ció|ona| co|a l|al |na |s d|que|en |el | to|s i| qu| en|e l|ns |tot|et |t a|ers| pr|t d|ons|er | ll|ion|a s|ta |a t|con|els|s e| l’|rso|res|als|son| un|est|cio| re|pro|ita|cia| in|les| o |ue |del|lli|té | té|ia |ame|é d|sev|ota|nac|i l| al|s p|a d|ar |a i|ual|nal|a c|ant|nci| le|ert|sta|rta|ser|t i|i a|l d| no|va |ats| d’|s n|re |s a|e c|eva| na|rà | ca|ues|com|lib|és | so|ibe| es|ets|ber|da |r a|no |una|l’e|s l|ter|sen|ran|ure|des|man|i e|l p|t e|n d|e d|e e|om | di|cci|igu|a a|s t| pa|i d|tra|s o|aqu|tre|vol|ect|a u|l i|gua|ide|s s|ada|ene|ial|nta|ntr|ens|soc|cte|ra |oci|hum|uma|cla|ali|lit|erà|cti| aq| hu|ici|pre|era|ess|uni|nte| fo| ni|ble|sse|tes|alt|eme|ass|ica|seg|o s|ote|rac| ig| po|ans| és|a e|un |us |mit| ma|r s|se |ssi|s h|a m|r l|nit|l t|ènc|ó d|ten| te|ir |i p|tal|eta|dic|i i|hom|t q|par|egu|s f| as|n l|ria| mi| ac|lic|int| tr|act|eix|n e|s c|ont|nse|ecc|t t|ltr|amb|qua|l’a|eli|ura|an |ist|e t|ó a|one|nam|ing|lar|o p|esp|rec|lig|a f| ha|iva| am|lle|t s|rot|mat|liu|tiu|iur|n a|fon|ots|inc|ndi|e p|seu|olu|gur|i c|més|der|rna|ina|for|igi|cie|bli|ic |mb |in |art|ol |rom|nin|omp",
    "sot": " le|le |ng |ho | mo| ho| bo|a h| e |lo |ya |ba |e m|a l| ya| ts| ba|na |ong| ka|a b|tho|e t|sa |elo|olo|a m|ets| di|o e|la |mon|oth|tsa|o y|ka |eng|a k|oke|kel|a t|g l|tok|ang|o t|tla|mot| se|o l|e b| na| ha|lok|wa |e h| tl| a |aba|o b|tse|ha | o |hab|e k|tjh|a d|tso|jha| to|se |so |oko|e e|tsh|dit|pa |apa|o n|e l|loh|kol| ma|o m|a e|ela|ele|ana|a s|let|bol|ohi|a a|tsw|kap| ke|hi |g o|ohl|eo |ke |ona|set|o k|o s|di | kg|e d|aha|lan|bot|bo |ito|o h| mm|hle|eth|ena|i b|ala|ats|moh|swa|lwa|g k|atl|abe|g m|ola|phe|bat|ane|a n|mel| me|o a| ph|ebe|ell|hlo|tlo|etj|mat| sa|g t| th|g y|lat|mol|g b|g h| en|she|the|seb|nan|lek|boh|hae|kgo|hel|e s|edi|wan|me |kga|ae |to |a f|ath|lao| hl|han|ile|nah|we |ume|kan|otl|len|aka|efe|ire|bel|bet|rel|swe|mme|sen|a p| ko|g e|atj|lel|its|bon|oho|eha|shi|man|ano|nts|he |lal|eka| fu|o f|heo|got|all|ao |het|hat|get|ban|hal|kge| wa|a y|lla|fum|mmo|kar|alo| ef|thu|e y|wal|tha|san|hon|tlh| he|e n|ben|hla|ing|uma|pha|o o|si | tu|tum|llo|lle| ta|pan|hen|mo |nen|hir| lo|son|ots|tab|ama|ato|din|lap|hil| eo|dis|oka|elw|tsi|llw|i m|hol|pel|iso|no |e a|fet|lwe|adi| fe|fen|hwa|opa|kop|are|amo|ret|emo|i k|isa|o p|o d|i l|gat|dik|i t| nt| la|ame|shw|hah| am|nya|ita|mab",
    "bcl": "an | sa|in | na|ng |sa | pa|na |nin|ang| ka| ni| ma| an|pag| as|sin|asi|n s|ion|n n|cio|a m|on |ban| de|n a|ga |kan| mg|a p|mga|a n|os |rec|ere|der|cho|ech|n p|aci|aro|n m|man|a s| la|n d|o n|asa|n k|g s|kat|sar|ata|ay |o s|al |ong|n l| o |a a|ho |a k|igw|tal|gwa|amb|kas|sai|mba|wa |ara| ig|agk|o a|lam|ro |o i|gka|ali|apa|nac|san|aba|g p|ina|a d|iya|yan|ing|lin|may|ink|aiy|nka| ba|aka|a i|yo | in|ag |abo| da|aha|ini| ga|tan|s n|nta|ano|agt|s a|kai|ad |hay|ida|hos|o m|og |ia |iba|ent|han| ta|par|n i| hu|at |ron|a b|g n|ant|g m|nal|ayo|a g|dap|mag|no |sta|aya|iri| pr|nga|ran|cia|g k|es |pat|li | co|dad|l n|y n|bos| si|mak|pro|ala|men|gan|aki|nte|lan|o k|con|t n|gab|a l|g d|ona|n b|ta |do |nda|aan|as |uha|agp|a c|uli|awo|taw|pan|n o| so|hul|i n|ter|ado|ags|g a|tra|min|anw|tay|kam|nwa|waa|g o|a o|kap|ain|bal|bil|ami|g i|d a|res|ra |nag|gta|ton|n e|ba |nan| mi|kab|en |bas|gpa|nes|o p| di|pin|ika|l a|n g|ind|isa|cci|ili|ial|ecc|tec|nci|ios|bah| es|one|pak|om |imi|agi|ico| re|ana| bi|a e|nid|rim|rar| se|rab|s s|hal|i a|buh|sab|cri|ubo|bo |gi |wo |rin|int|agh|ipa|sii|ibo|ani|to |sad|hon| le|iis|a t|ast|say|lar|n c|aag|ote|rot|n t|y m|ici|paa|ley|ey |yag|aen|dan|ni | pu|atu|lab|sal|ica| gi",
    "glg": " de|os |de | e |ión| a |da |to |ció|ere|ón |der|ito|en |a p| co|ent|eit|n d| se|rei|ade|as |aci|dad|s d| pe|per|o d|s e|e a|e d|men| da|nte|ers| pr| te|do |al |rso|ida|es |ten|soa|oa |que| to| po| o |a t| in|a e| li| do|cia|te |tod|res|o a|pro| re|tos|est|ra | es| ou|dos|lib|con|a d|nci|o e| na|e e|a a|a s|ber| á |oda| pa|e o| qu|e c|ue |ar |nac| en| sú|tra|s p| un|súa|com|ou |ia |nto|ser|a c|er |ns |a o|se |des|is |ter|s n| ca|ado|or |óns|sta|úa | no|rda|s s|ibe|rá |erd|era|no |nal| as|ica|e p|eme|erá|pre|sen|das|e n| ni|e s|por|ais|par|ant|ara|ame|cci|ona|io |o p|n p| di|cto|s t| so|o t|o á|nin| me| os|cio|enc|unh|n e|n c|nha|ha |ntr|ion|n s|á s|n t|s o|ese|nta|ect|e i|o s|e l|so |nid|oci|soc|ont|dic|ici|e t|tad| ac|tiv|ndi|ali|gua|l e|rec|a l| ig|omo|cas|o m|re | ma|ing|na |igu|vid|eli|ngu|und|s i|rac|a n|cla|cti|seu|ria|on |ase|o n|lic|s c|man|lid|a u|uni|ta | ó |ual|ido|ori| fu|ind|nda|ste|s a|tes| tr|act|ial|fun|dis|ecc|o ó|cal|mo |un |e r|iva|n o|ca |n a|o c|esp|ome|o o|seg|sti|r a|tor|r d|egu|ada|lo |nde|r o|uma|ote| el|alq|lqu|uer|spe|a i|tar|bre|tri|hum|olo|cie|ren|ena|ari|mat| fa|med|ura|lar|edi|ver|ixi|á p|ibr|gur|int|pen|rot|a f|cac|s f|ili|rio|ma |a v| vi|rim|len|ita",
    "lit": "as |ir | ir|eis|tei| te|s t|os |uri|ti |us |is |iek| pa|ai | vi|vie|tur| ki|ri |žmo| tu| žm|ien|ės |ių |ali|ais|mog|vis| ka|lai| la|ini|i t|s i|s ž|sę | į |isę|ena| ne| pr| bū| jo|pri|kie| ta|kvi|nas| su|ekv|mas|gus|būt|tin|isv|s s|ogu|isi|mą |mo |ant| ar|s k|ama|kai|ūti|s a|s v|aci| ti|s n| sa|s p|oki|cij|inė|ar |val|ms |tai|jo |i b| na|gal|sav|kur|aus|men|rin| ap|imą|ma |sta|ę į|ina|i p|imo|nim|i k| nu|ima|oti|mis| ku|jos|lyg|dar|išk|je | at|tas|kad|r t|tų |ad |tik|i i|nės|arb|i v|ijo|eik|aut|s b| įs| re|iam|sin|suo| be|isu| va|li |sty|asi|tie|ara|lin|isė|i s|ą i|jų | ly| ga|vo |si |r p|tuo|aik|rie| mo|din|pas|mok|ip |i n|rei|ybė|mos|aip|r l|ntu|įst|į t|gyv| iš|nti|tyb|ų i|pag|kia|kit|es |uot| sk|jim|tis| or|aud|yve|ven|mų |als|ų t|nac|avo|dam|ą k|i a|s j|oje|agr|kla|gau|neg|nių|o k|ega|iki|aug|ek |tat|ieš|tar|ia | ši|ios|ška|sva| to|tau|int|sau|uti| as|io |oga|san|mon|omi|kin|ito|s g|ome|r j| ve|aty|kim|nt |iai|lst| da|ją |min|r k|o t|nuo|tu |ver|kal|am |usi|o n|o a|ymo|tym|vę |ati| ji|o p|tim|ų n|paž|ter|s š| vy|alt|ksl|ing|ų s|oma|šal|ran|e t| ni| ša|ava|avi|nie|uom|irt|elg|jam|ipa|kių|tok|eka|tos|oja|kio|eny|nam|s d|ndi|amo|yti|gri|svę| gy|lie|ėmi|ats|ygi|soc|sie|oci|pat|cia",
    "umb": "kwe|oku|a o| ok|nda| kw| om|da |wen|e o|a k|la |ko | ly|end|nu |ka |o l|oko|mun|omu|unu|kwa|wa | ko|a v|o y|omo|mok|ali| vy|eka|olo|i o|osi| yo|lyo|mwe|si |okw|we |lo |iwa|o k|i k|le |te |a e|ete|gi |kut|sok|ong|iso| ya|vo |ang| ey|wet|ata|a y|o o|yok|ofe|fek|kuk|ela|a l|ilo| wo|owi|nga|iñg|kul|oka|vyo|uli|u e| va|li |ñgi|kal|wat|ta |u o|eci|ngi|ovo|ye |so | li|oci|yo |wiñ|nde|ga |ing| nd|ili|nge|ci |eye|ala|vya|e k|kol|isa|a a|lom|lon|go |avo|ako|ovi|pan| ol|uka|ngo|lya|ti |o v|akw|yal|olw|uti|imw|eli|alo|ge |ung| ku|a u|lis| al|onj|ati|wal|ale|e l|sa |i v|and| ov| yi|ika|ukw|ele|lil|yos|he | oc|yov|iha|ikw|omb|val|lin|lim|ahe|apo| ka| ye|yom| vo|lik|i l|kok|wav|aka|cih|o e|tiw| ke|yi |i w|ama|e y|lof|yow|yol| ek|kov|ole|vak|vik|tav|omw|a c|upa| el|ila| lo|aso|su |e v|lyu|ava|ñgo|lwa| wa|gis|gol| ce|tis|ave| on| es|po |wil|va |eso|kup|co | la|yam| ak|wam|iyo|ekw|e e|i c|tat|i a|a n|yah|eko|lwi|ita|lit| ec|kwi|upi|i y|epa|kan|kiy|nja|dec|asi|e u|yav|asu|mak|lap|yim|tya|vos|kas|cit| ha|lel|u c|a w|emb|u y|ola|yon| os|win|lye| ca|eyo| uk| ci| ow| yu|ayi|vel|liw|has|iti|sil| et|yuk|o w|umb|ulu|ya |wi |anj|kat|ngu|wom|o a|uva|esu|usu|mbo| co| of|mat|o c|ca |cel|vi |u l|ba |kon|mbe|wiw",
    "tsn": " le|le |go | mo|ng | ts| go|lo | bo|ya |we | di|gwe| ya|ong|ngw|sa |olo|elo|a b|tsa|tsh| e |tlh|a l|o t|e t|a g|e m|wa |a t|o y|eng|na |e l| kg|wan|kgo|mo |o n|tse|a k| tl|ets|ane| ba|dit|mon|ele|hwa|shw|la |ka |a m|nel| na| ka|e d|o l| o |o m|ba |se |e g|e e|bot|a d| a |di | ga|ots|tla|otl| se|lol|o b|tho|so |lho|tso|o g|ang|got|e b|ga |lel|seg|o e|its|gol|ose|ho |oth|let|e o|lha|ego|aba|hab|e k|ano|los|a n| nn| ma|eka|g l|šha|tšh|kan|alo|ola|lhe|ela|aka|sen|gat|tsw|kga| nt|mol|o a|nng|o o|o k|aga|atl|o s|bat|tlo|agi|yo |len|g y|edi|e y| th|g m|dik|to |tir|e n| ja|a a|mel|o d|ana|ire|g k|rel|swe| yo|bon|gag|lek|e s|mot|kwa|i l| te|a s|he |agw|ats|iwa|i k|itš|ona|no |a e|mai|any|lao|ikg|she|ntl|lwa|dir|g t|lon|ale| sa|ao |hel|shi|tle| wa|ume|log|jwa|itl|pe |hir| jw|non|iti|a y|set|hok|ira| ti|odi| me|gi |e j|tek|etl|a p|ko |ath|ala|hol|bod|tet|mog|han|nya| mm|g g|nag|i t|adi| lo|oag|i b|nna| ko|the|lan|re |thu|wen|hot|nyo|hut|o i| ne|pol|me |tum|ope|ame|gan|emo|ore|wel|nts|oko|okg|iro|ro |tha|elw|amo|gor|ing|jal|isi|nan|ogo| it|jaa|si |oga|heo|gon|diw|pa |opa| kw|lat|are|bo |o j| ke|ke |ile|gis|o f|rag| ph|bok|aak|kar|rwa|nye|g a|atš|mok|ago|okw|hag|ate|ato|uto|gwa|mme| fa|fa | op",
    "nso": "go | le|le | go|a g|lo |ba | di|ka |o y|ya | ka| ya|ng | ma|a m| mo| tš|elo|etš|e g|a l|o l| bo|a k|a b|e t|na |o t|tok|wa |e m|a t| ga|la |ang| a | ba| se|man|tše|oke|o k|ša |kel|dit|tša|tho|we |ele|a d|o g|o a|a s|o b|gwe|e d|ho |o m|ego|e l| na|tšh| to|šo |še |oko|ga |di | o |olo| e |let|ong|gob| ye|oba|ago| tl|tšw|mo |e b|re |g l|ngw|aba|tšo|swa|šha|ane|tla|hab|o n|ona|ito|ela| kg|ogo| th|oth|wan|eo |e k| sw|lok|kgo|log|ye |o d|a n|ola|g o|e s|set|hlo|kol|se | wa|lel|ao |eng|o s|šwa|mol| ts|eth|net|ano| bj|a y|o e| ke|thu|hut|šwe|ge |itš|leg|rel|alo|to |ohl| ge|mog|kan|e e|ire|nag|ke |eba|aka|pha|gag|bot|o w|aga|a a|mot|are|mok| yo|gor|oka|ko |gon|no |ore|ana|agw| wo|bon|bat|lwa|tse|bja| ph|din|yo |e r|šeg|e y|ath|nya|get|lao|sa |wo | re|wag|odi| sa|seb| me|utš|oph|mel|iti|kge|ato|kar|o o|šom| la|o f|phe|edi|hir|ala|pol|lat|ušo|i g|a p|g y|the| fi|ume|wel|bop|hel|emo| du|ile|gwa|bo |ale|tle|lwe|lek|ban|ta | lo|lon|o š|dir|mae| mm|tlh|god|pel|a w|weg|eka|elw|atš|išo|aem|šhi| ko|gam|rwa|mmo|boi|e n|ntl|pan|amm|i l|i b|hle|hla|leb| am|šon|jo |len|i s|kop|ret|gel|ing|opa|yeo|dum|sen|e a|ape|ase|kwa|lef|mal|amo|oge|bjo|oik|mon|kga|okg|a f|tsh|boh|uto|ika|ahl|ja |adi|iša|gab|hom|abo",
    "ban": "ng |an |ang| sa|ing|san| ma| pa|ane|rin|ne |ak |hak| ha| ka|n s| ri| ke|nga| ng|man|in |lan|a s|ara|ma | ja|n p|n k| pe|g s|g p|pun|asa|uwe|gan|n m|nin|sal|pan| la|alu|iri|sa |lui|jan|adi|a m|adu|uir|ra |yan|mad|kan|wan|duw|ur |tan|g j|anm|we | tu|nma|ika|awi|nge|ah |tur|ih |ban|ka |e h| ne|n n|en |nte|un |ngs|eng|anu|beb|aya|ani|ana|ian|a p|ala|bas|nan|gsa|ngg|uta| da|gar|aka|eba|da |apa|asi|ama|lih|aha| wa|ten| ut| ta|a n|ebe|are| wi|han|aje|keb|oni|nik|ent|aki|uni|ata|wia|iad|g n| pu|jer|ero|ron|aan|k h|saj|din|sak|a t|nus|dan|n w|pen|usa| ba|ngk| pi|ant|sam|e p|taw|n r|ate|wi |nen|i m|ega|neg|iwa|pat|atu|e s|ami|ipu|g k|ina|mar|kat|kal|aga|sar|ran|kin|per|g r|ndi|arg|ar |ksa|e m|ren|nya|al |tat|ida|ela|h p|aks|ntu|ngu|ado|lak| ny|oli|at |wen|ep |i k| se|dos|h s|n l|dad|gka|eka|a k|rep|eda|n h|par|upa|ena|swa| sw| in|nay|ewa|ung|era|ali|a u| mu|eh |nip|r p|e k|n t|k p|ras|i n|uku|n i|wah|eri|g m|pak|n b|r n|ayo|nda|mal|mi |um |dik|os |osa| mi|yom|na |teh|awe|k r|lar|car|tah|sia|g h|ti | hu|ut |huk|kum|sti|ewe|tuk| me|rga|pin|h m| su|gi |ari|n d|a w|ta |uan|gaw|gen|h r|on |war|tut|lah|pag|gay|r m|n u|ada|ira|a b|ngi|end|kew|g t|min|ggi|gda|jag|as |rap|agu| an|e n|ngd|s k|ila|eta",
    "bug": "na |eng|ng | na| ri|ang|nge|nna|ngn|gng|ge |sen|a r| ma| pa| si| ta| ha|ri |hak|app|tau|ak |au |ddi|a t|ase|edd|ale|a n|nap|gen|len|ass|pa |e n|ai |ria|enn|ega| ru|upa|rup|ias|a a|ing|inn|a s|pun|ngi|nin|e p|ini|nai|ga |lal|gi |sin|ppu|are|ae |ye | ye|ana|g n|sed|ada|le | as|i h|a p|ama|g r|i r|man| se|una|ara|ra |di |ssa|ren|a m|pad|e r|ila|ban|asa| ke|san|din|e a|ura| la|ane| de|nas|e s|i a|ipa|pan|u n|ann|i l| ad|da |ala|aji|ole|att| pu| e |ong|i s| ba|pur|aga|lai|i p|lan|g a|ngs|sal|ola|gsa|g s|a b|i n|ppa|rip| we|a k|g m|asi|wed|akk|mas|i m|ril|u r|reg|g p| pe|ung|gar|neg|sse| po|e m|k h| ar|pas| ne|map|ian| te|nar|pol|ett|ran| ja|bas|eba|jam|beb|ena|par| al|sib|ebe|ngk|uru|keb| sa|ain|ttu| mo|aka|unn|add|iba|sa |gan|gka|nen|bbi|i t| at|atu|kan|nan|uan|leb|rus|de |e d|ton|ata|tu |ssi|ro |e y|cen|kun|awa|ell| wa|k r|mak|wa |uwe|ire|ebb|gag|apa|sae| tu| ia|tte|mat|sim| to|a d|o r|ta |nat|ece|tur|la |ie |dec|ko |kel| di| hu|nca|caj|pak|rel|ma |lu |g t|bol|uku|e e|ter|jaj|tta|we |bir|deg|huk|e h|dan|ure|baw|kol|rit|kko|ele|arg|rga|llu|oe |lin|use|ari|auw|pat|mul|elo|ula|iti|gau|an |u p|nga|g y|a h|ekk|sil|ka |e w|ade|anc|iga|sip|ten|a y|e t| me|nre|aja|ji |rek|a w|dde|per|iko|sik",
    "knc": " a |ro |be |nzə|ye |a a| ha| kə|abe|akk| ka|zə |adə|a n|a k|kki|hak|mbe| la| ad|ndu| nd|wa |ben|en |ma |də | ya|o a|əbe|ə a|ga |e a|əga|lan|əna|lar|aye|aro|kin|inz|rdə|ard|ana|yay| ga|əla|kəl|ji |awa| mb|bej|eji|kən| ba|an |uro|du | na| ku|anz|dəg|nəm|kal| nə|e m|na |gan| du| sh|shi|amb|n k| su|ara|u y| ta|so |a d|kam|wo | ye| sa|e h|a s|sur|aso|au | au|iwa|nyi|kur|a l| da|kar| as|dəb|iya|kiw|o k|obe|e s|ada|ama|and|u a|aa |ta |ima|n n|la |əwa|nga| ci|ba | ab| nz|əgə| fa|ənd|ata|ndo|ya |tə |nza|ə n|ndi|a g|in |nam| fu|ə k|aya|a t|tən|a b|təg|ru |uru|inb|am |e k|al |ida|mga|aar|a h|baa|ə s|nab|dəw|dun|asa|nya|owu|gad|taw|o w|gən|a y|kat|dam| sə|o h|əra|e n|awo|ade|əmk| wa| wo|amg|dən| tə|a f|ala|i a|zəg|o n|uny|iga|zən|əli|wur|u k|o s|wan|za |din|utu|e l|san|i k|uwu|wu |awu|n a|on |de |da |nba|mka|yi |gay|tam| ng|laa|gin|azə|bem|gai|taa|ibe|rad|adi|fut| mə|wow|wak|ali|kun| an|mər|o t|yab|nad|aim|əgi|i n| aw|liw|cid|u s|edə|atə|any|do |apt|lka|alk|dar|rta|bed|tu |ela|ndə|uwo|gal|yir|wum|n y|ayi|n d|mma|zəb| yi|nan|ltə|lmu|ilm|mar|bel|raj| il|ero|m a|utə|enz|iro|alw|uma|umm| um|e g|how|kka|o f| ny| ho|fuw|ə h|ang|tin|zəl|o g|ema|ən |no |a i|a m|wal|əny|iwo|lil|ədə|ə f|rtə|hi |diy|mu ",
    "ibb": "ke | nd| mm|me | ke|e u|ndi|o e| em|mme|de |en |e n|owo| en| ow|wo |i e|mi |ye |emi|nye| un|e e|edi|ene| ek|yen|eny| ed|e m|nen|une|ana|n e|e o|e i| ye| uk|et |n n|eke|na |e k| mb|em |ne | id| es|un |kpu|ede|iet|ndo| nk|o k|di |kpo|ukp|did|am |an |kie|nam|kem|esi|o u| nt|idu|eme|o n|t e|no |yun|mo | uf|ho |mmo|nyu| in|o m|kpe|o o|sie|oho| kp|do |din|ie |ono|kpa|m e|ri |nkp|dib|on |e a|uke| ki|boh|a k| et|po |ida|dut|m u|ked|ded| ub| of|ond|ru |uru|pur|in |ut |du |eko|a u|ina| ot|mbe|n o|bet|iny|man| ak|op |idi|ikp|i o|edu|kon|ade|om | us|uan|wem|a m|uwe| uw|puk|ak |ode|ro |t m|a e|oro|a n|n k|u o|to |te |bo |akp|ufo|ok |dik|pan|mbo|bio|i m|ide|ini|fur|uri|ban|ofu|ubo|n i|o i|uto|iso|dom|omo|ema|diy|fen| nw|dis| ny| is|ni |usu|n m|u u|fin|tom|eto|pem|ed |m m|ibo|oto|o a|sua|wed|nwe|m n| ut|mde|dud| eb|ara| as|i n|oki| ob|nte|mok| ik| an|kar|m k|o y|t k| on|i u|nwa|n y|asa|ama|re |ufi|uka|io |nek|i k| or|pon|top|sun|ion|se |aha|t o|k n|e y|ere| ef|mba|mad|isu| mi|kor|ra |ian|i a|ka |a a|k m|ko |da |t i|ena|obi| ey|ha |dia|ti |aba|uk |u m|d e|dem|san|a o| se|pa | ab|tod|n u|p m|ude|fok|k u|efe|uku|nti|nka|ibi|son|he |pe |nto|dak|a y| od|nde|eye|anw|ndu|mbu|so |ebi|bie|nda|sin|med|tu ",
    "lug": "a o| ok| mu|oku|mu |wa |nga| ob|ga |tu |ntu|a e|na |bwa|a a|ang|ra |aba| n |ba |a m|wan|a n| ng| ab|li |obu|unt|a k|era|ibw|dde|oba|a b|u n|za |la |mun|ban|ali|ka |emb|iri|bul|ate|mbe|i m| ek|tee|eek|uli| bu|u a|edd|sa | ku|ant|ana|eki|u b|be |dem| eb|ama|n o| om|ira|omu| ki| ed|ye |ala|amu| am|e o|gwa|nna| er|kuk|y o|kwa| en|okw|eer| ly|inz|ula|kus|kir|u e| ba| em|eri| ky|any|onn| wa| ye|ggw|ina|kol|n e|awa| bw|uyi|u k|eka|yo |bwe|ola|o e|usa|o o|kwe|mus|yin|bal|i e|u m|ngi|e m|bir|riz|ere|ri |ebi|kul|aga|nza|kub|ekw| eg|ko |a y|u o|we |kut|mat|e l|e e|a l|aan|ger|no |kan|sin|nka|gir|uso| at|a g|iza|gan|nyi|zes|uku|wo |nge|zib|isa|izi|ya |egg|ufu|rir|lin|wam|wal|eby|a w|i o|bee|oze|esa|eta|iko|ebw| ma|ako|bon|tuu|kin|uki|de |zi |kug|yen|ino|e b|obo|aka|ulu| te|ne |lwa|ma |y e|lye|kuy|nsi|i y|gi |utu|ly |imu|e n|taa|asa|enk|ku |o n|o b|sob|si |una|bun|usi|san|e k| ag|uka|uga|ata| ol|rwa|wen|ing|wat|kik|o k| by|nya|ong|kye|by |kyo| bo|ewa|yam|bye|ubi|ngo|kis|ani|boz|kit|i n| aw|ky | al|sib|muk|awo|uko|umu|ibi|uma|afu|olw|eky|tab|ung|buy|ini|uum|saa|y a|lal|mag|ro |end|add|enn|kib|ens|ole|ni |mbi|o a|i k|gat| og|maw|and|kuu|a z|wet|igi|yig|emu| ne| gw|a t|nzi|n a|gya|amb|uwa|ulw| ey",
    "ace": "ng |an |eun|ang| ha|peu|oe |ak |on |nya| ny|yan| ta|ngo|ung|gon|na |ah | pe|reu| ng| ba| ke|hak|meu|keu| me|eut|at |ure| na|ban|ee | di|teu|roe|ata| ur|ara| be|seu|han|a h| sa|am |dro|eur|um |n n|tie|iep| ma| la|ala|nan|g n|ut |ong|a n|ep |tan| te|tap|jeu| ti|eul|eub|eu |eug| da|eum|eh |euk|ra |ih |n p|uga|ai |n b|a t|e n|lam|eba| se|beb|n t|awa|om |a b| ka|asa| at|eus|and|nyo|oh |ta |ka |h t|n k|p u|man|e t|n d|n h|ana|dan| pi|ape|a s|neu|nda| si|t n|bah|ula|yoe|a k|h n|dum|euh|g d|e p|eng|e b| le| pa|ngs|sia|ran|ma |g k|un | wa|ndu|lan|una|heu|ura|n m|lah|sa |n a| ra|aba|g s|a p|ia |und| je|wa |kat|bak|k n|anj| dr|asi| bu|nga|beu|uny|yar|sya|hai|k m|k t|k a|ama|aan|ek |a m|ok |g h|aka|sab|g p|i n|uta|khe|h p|ue |uka|har|ari|di |e d| su| um|t t|a l|ya |san|e s|gan|uko|gsa|e u| li|kan|bat|lee|aro|ot |n s|leu|ina|h d|lak|oih|yat|n u|kom|pat|ate| ne|ngg|nje|taw|mas|uma|sid|anu|umu|aja|si |uh |h m|rat|aya|sal|et |soe|t b|n l|aga|taa|usi| ja|ute|m p|en |dek|ila|a d|ube|dip|gam|any|lin|tam|don|ika|usa| ji|rak|idr|h b|nus|adi| as|dar|ame|n j|ngk|m n|eup|h h|bue|k h|huk|euj|g b|gar|eka|gah|upa|ile|sam| bi|h s| de| in|mum|‐ti|t h| hu|k k|pho|dil|ep‐|nta| ge|geu|h l|hat|ie |tha|use|ieh|sas",
    "bam": " ka|ni |a k|ka |an | ni|kan| bɛ|n k| la|i k|ya |la |ye |ɔgɔ|na | ye|bɛɛ|ɛɛ |en |li |sir|ɛ k|ama| ma|ira|a d|ra |ali|’a | da|man|a n|a b| i |ma | kɛ| wa|gɔ |wal|mɔg|ana|n n| ba| ja|ɔrɔ| mi| kɔ| k’| mɔ| jo| si|min|iya|dan|len|i m|’i |in |kɔn|ko |aw |den| sa| o | n’|ara|bɛ |i n|jam|ɔnɔ| na|ɛrɛ|a s|i j|ani|n b|a m|i d| fɛ| tɛ| an|osi|jos|a y|kɛ |a l|iri| ko| di|ɛ b|ada|ila|ɛ m|i t| fa|nɔ | de| ha|asi|tɛ |ari|a j|raw|a t|ɛ s|ale|a f|tig|ɛn |aya|dam|a i|i b|sar|si |riy|ɲa |n y|nu |inn|e k|ɔn |rɔ |ang|a w|o j|w n|nnu|k’i|nti|nɲa|ade|abi|bil|ala|hɔr|kal|had|igɛ|i s|a a|mad| a |aga|u k|kab|a ɲ|aba| ti|olo| hɔ|o b|ɛ j|i f| ta|ɔ k|aar|baa|ɛ n|n’a|kun|ugu|iɲɛ|diɲ|n j|k’a|a h|rɛ |ati|ɔ m| se| cɛ|ɲɔg|bɔ | tɔ|i y|lan|i h| ɲɔ|tɔn|don|nɛ |inɛ|ga |i l|ɲɛ |ile| fo|o k|ɛ l|nna|ili|un |gɔn|maa|fɛn|n d|ant|n i|aay|go |da | jɛ|u b|ri |rɔn|aka|lak|ɔnɲ|e m|ɔ b|nin|nw |cɛ |w k|yɔr|n o|o f|nga|jo |o m|nen|n’i|on |ɛ t| ku|o l|igi|ɲɛn|anb|fɛ |ɔ s| bɔ|n m|e b|afa|nka|n f|nma| fi|’u |ɔ n| ɲɛ|fan|i ɲ|ti |a o|dil|ɛ d|uya| sɔ|ago|ɛ y|e f|ɛmɛ|mɛn|aju|e d|bɛn| jɔ| fu|til|bag|fur|n t|uru|kar|atɔ|be | d’| du|d’a|oma|lom| u | do|riw|taa|w l|mɛ |gɛ |imɛ|n w|iir|nni|iim|amu|so |bal| ɲa| b’|gu |ɛɛr|’o |iwa|n s|wol|ele|ɲan",
    "kmb": "a k| ku|ya |la |ala| mu| ki|a m| o |u k|ni |o k| ni|kal| ky|mu | ya|lu |dya| dy|a o|ang|kya|a n|tok|i k|oso|so |kwa|nge|xi |na |elu|nga| kw|wa | wa|a d|hu |kut|thu|uka|oka|mut| ka|a i|mba|uth|ka |gel|ba |u m|u y|ku |ene|u n|ga |kuk|ban|ixi|i m|e k|wal|oke| mb|kik|kel|ne |u w|ela|uto|i y|ana| ng|iji|a y|kit|ma | ji|nda|ngu|yos|kum|ulu|ji |i d|isa|und| it|and|ong| mw|u i|iba|ika|wen| di|ten|ilu|ila|ndu|ye |sa |kub|aka|ena|amb|ung|olo|a w|ngo|kil|oxi|lo |muk|ke |sok|du |mox|ate|o w|kus|wat|ta | wo|gu | ph|u d|ito|ita|e m|alu|a j|kis|tun|uma|wos|luk|o m|san|mwe|a a|di |imo|ula|wan|nji|jix|i j|a t|kij|idi|kan|uku|gan|kul|e o|kye|adi|ato|o i| ja| ix|da |nu |o n|uta|kud| yo|i n|udi|ki |su |tal|a u|lun|e y|u u| ye|jin|iki|pha|hal|wij|we |a s|lak|ikw|go |tes|fol|itu|eng| ke| uf|yen|ing|yat|ele|utu|kyo|o y|kwe|kwi|uba| en|kib|ite| we|dal|i o|yan|ge |eny|tan|uki| ik|dib| im|esu|lon|kat|atu|e n|ja |i u|jya|vwa|kam|i w|ute|ini|uke|lel|esa| se|xil| ut|fun|unj|ufo|mbo| a |uso|kim|mun|u p|nen|ukw|u o|i i|umu|han|gon| il|lan|ata|te |i a| ko|jil|o a|nde|nyo|eka| at|o d|exi|ijy|tu |usa|tul|kuz|ilo|dis| un|u j|dit|ufu|ote| ib|ivw|mwi| bh| ha|se |bul|ubu|win| os|imb|bha|ama| to|axi|inu| uk|sak|kos|bot",
    "lun": "la | mu|ng | ku|a k|tu |ntu|chi| ch|a n|aku|di |mun|ma |unt|a m|g a| a | na|ela|ndi|aka| we|ima|jim|shi|eji|u w|i k| ni|ind|wu |i m|a w| in|a i|u m|hi |awu|na |kul|wej|lon|cha| ja|sha| kw|a c|i n|nak|ala|mu |wa |ing|ka |ung|kum|a h|ulo|him|mbi|muk|u c| wa|hak|iku|nsh|yi | ha|bi |amu|imb|ewa|wen|kwa|ang|adi|idi|kut|esh|ana|g o|ila|ha |tun|u j|ong|nik|kuk|tel|ovu| ov|u n|han| an|ate|vu |a a|kal|ula|kwi|jak|u a| ya|a y|ilu|u k| he|ham|and|uch|kus|ond|eka|hel|kew|zat|del|hin|uku|nde|i j|enk|i a|uka|eng|ach|lu |nat|nji|ona|mon|awa|nke|umo|ins| yi|a d|ama|udi|wak|i h|ati|i c|wan|ta |bul|mwi|ata|ayi| ak|uma|i y|ina|ich|itu|uza|kuz|nin| mw|ku |kin|wun|sak|naw|nyi|ni |ant|muc|wal|ish|u y|mul|kud|waw|uke|wes|uki|i i|kam|yid|wit|da |akw|kad|yan| di|ken|uta|ika|imu|iya|nda| ns|mbu|ya |ule|dil|iha|kuy| ko|hik|eni|ahi|kuh|si |kun|ush|umu|atw|g e|his|dik|ji |any|li | ye|dim|kos|osi|hih|wat|eyi|ney| ne|amb|twe|til|wil|nu |kwe|u h|etu|tiy|ja |nan|ash|mwe|win|was|hit|iti| wu|iwa|wah|lem|g i|tam|din|hu |haw|nga|kay| ka|hid|yin|isa|iki| ma|jaw|jil|che|mpe|omp|eta|tan|jin|hiw|usa|umb|eme|inj| hi|ulu|ubu|nam|wik|mpi| da|ale|ite|tal|twa|ahu|end|nka|mba| at|ga |mes|dic|iwu|yej|kan|kuc|iyi|sem|emb|lun|una",
    "tzm": "en |an | ye| d | n |ad |ur | ad|n i| s |agh|ḥe|n t| i |dan| ta| lh|lḥ|d y| gh|ell|n a|ra |̣eq|i t|eqq|s l|mda|ett|n d|d t|akk|la | ti|qq |hur|di | di| am|gh |ghu| is|t i|r s|in |nag| na|a y|is | te|a d|n n|yet|n g|ll |ara|ghe|ma | we| ar| wa|n s|l a|n l|sen|edd| ak|it |li | le|dd |ull|lla| id|d a| ur|rfa|erf|kul| yi| ku|as | se| ma|zer|amd|a n|lli|lel|men|t a|kw | de|t t|nt |kkw| im|fan|a i|a t|eg |n w|i d|q a|rt |ar |gar| ag|es | tl|ize|emd|i w|i l|deg| as|ken| dd|n u|lan|d i|a a|wak|tta| tm|d u|er | tu|wem|at |ddu|tle|w d|n y|t n|sse|r a|mur|s t|tam|gi | tt|yes|wan|r i|tim|na |wen|twa|d l|ttu|kke|wa |nen| iz|iḥ| u |win|d n|ame|s d|ent|ḍe|hel|a l|hed|ess|t d|mga|arw|i n|ḥu|mi |mad|agi|i g|der|udd|s n|rwa|̣en|awa|i i|ya |h d|iya|s y|msa|uḥ|idd|urt|un |n m|ane|em |sef|lsa|ili|q i|qan|leq|siy| ik|el |err| in|yed| la|ant|den|tag|man|g w|mma|yen|len|tmu|i u|aw |taw|r y|wad|edm|ṣe|hla|t l|̣er|ala|asi|ef |u a|tte|ddi|ttw| lâ|imi|l n|til|al | ne|am |̣ud| lq|iḍ| ya|dda|̣ṛ|med|ren| ss|gra|m a|ghl| il|chu|tem| ll|khe|way|eln|lna|ana|ukl|duk|gha|lt |ni |all|i a|tal|ray|nes|s k|tes|naw|ert|ila|awi|lqa|kra|anu|nun| kr|ikh|ezm|n k|iwe|iwi|ima|net|ser|s u|ir |yeh| an|aya|ehw|hwa|esk|dde",
    "war": "an |ga |nga| ka| ng| pa| ha|han|pag|in |ata| hi| an|mga| mg| ma|kat|hin|a m|ay |a p|ya |ung|a k|gan|on |n h|n n|ug |n p|n k| ug|n m|da |a h|n i|ha |iya|adu|dun|tad|a n| ta|ada|sa | iy|ara| na| di| o |pan|may|a t|ang|ud |ana|n a|o h|o n|taw|n u|ags|yon|y k|al |tag|asa|kad|o p|man| ba|awo|gsa|wo |ag |gad| in|a a|a u|ina|syo|a i|a s|od |ing|agp|ala|asy|ngo|n b|ali|nas|san|aka|a d|ra |g a|was|g h|aha|gpa|agt|to |ad |n t|tun|ng |usa| wa| tu|ini|iri|tan|ahi|kan|ray|nal|war|dir|i h|gka| us|god|g p|ri |a b|nan|ida|o a|i n|bal|y h|kas|uga|hat|tal|nah|awa|ni |pin|uha|buh|o m| bu|gud|aba|at |no | pi|bah|g m|ili|him|aya|atu|d h|agi| su|agk|lwa|mo |d a|alw|sya|uma|ano|int|kal|upa|mag|yo |o u|agb|n d|asu|lin|a o| ko|ona|did|hiy| bi|as | ki|l n|sud|iba|hi |o k|kon|ira| la|gba|pam|amo|g i|ton|gin|n o|uro|ho |os |la |g k|gtu|d m|aud|aag|t h|gi | gu| ig| ir|n g|abu|aho|ami| sa|ati|par|kau|ern|ban|tra|gar|ama|ras|yan|adt|tum| un|ka |aga|aso|api|dto|kin|tik|mil|iko|rin|sal|ika|a g|ila|mah|lip|rab|non|agu|ak |dad|lau|d n|ko |it |pak|n e| ti|una|i m|lig|s h|bay|ro |sug|mak|n w|naa|g n| so| ag|yal|nte|lal|ba |aup|lan|ihi|y b|kah|tub|bye| am|ari|yer|uka|ani|uyo|oha|ito|n s|upo|ent| pu|sam|iin|til|mat|ato",
    "dyu": "a’ | kà| ká|kà |ye | ye| à |ya’|ni | bɛ|kán|la |án |ya |ɔgɔ| ni| la|ɛɛ |ká |na |a k| mɔ|bɛɛ|mɔg| i |nya|á k|n k|ɔrɔ|’ k| mí|’ l| kɛ|mín|’ y|ín | mà|à k|ɛ k|’ m|ma | ya|à m| wá| jà| ní| be|be | ò |i y|ní |i’ | lá|ra |iya|ɛrɛ|n’ |n n| há| kɔ|te |wál|àma|jàm| te|áli|a b|ima|man|à à|hák|e k|lim| kó|ɔnɔ|mà |n b|i k|ɛn |gɔ |e b|n y|ɔ’ |ana|’ n|o’ | sà|ɛ y|’ s|kɛ |à l|rɔ |e à|kɔn|li’|àni|a m| dí|aw |rɛ |ɔ k|’ b| bá|à b|a à|ákɛ|riy|e s|gbɛ|nɔ |a j| bɔ| ù | sɔ|bɛn| sí|à y|sàr|e m|ara|kó | fà|à s| àn|dún| là|en | sì|an’| fɛ|úny| dú|a n|a y|ɛya|àri| gb|in |kɛr|kan|’ t|dí | cɛ|nin|yaw| tá|na’|e w|mìn|ìna|lá |ɔn | mì| ɲá|à d|ali|n m|yɛr| yɛ|sɔr|gɔ’| tɔ|ama|báa|nga| dà|i m|i à|sìg|ìgi|yɔr|gɔn|w n|áar|a d| sé|ána|àng|len|à i|si |ɛra|á d|bɛr|a s|bɔ |ólo|a h|i b|ɔ s|ɛ l|den|ɛ’ |à t|àra|ɔya|gɔy|kɛy|ógo|u’ |aya|’ d| má| dɔ|ra’|a f|ɔny|’ f| ó |ili|sí | se|se |ko |cóg|a t| có|dén|hɔr|ɔɔn| hɔ|ma’|lan|ika|ina|kàl| a |àla|n s|ɛ m|i t|rɔn|tig|ànt|a w|tá |e n|i s|à n|nna| í |’à |ò k|a g|n d|an |ga |fɛn|ɔ à|li |e i|ɛɛɛ|kél|ati|so’| yé|i f|áki|dàn| k’|i n|k’à| nà|í i|í à|lik|yé |igɛ|e’ |e ò|go | lɔ| na|ɔ b|w l|í t|rɔ’| dò|ò b|min|ti |àga|ow |n t|mad| mi|ò l|éle|gi |ɲán|í y|kil|dɔ |nba|i ɲ|gu | wó|ɛli|i l|úru",
    "wol": " ci|ci | sa|am |sañ|añ | na| ak|ak |lu |it | mb| am|aa |na |al |ñ s|ñu |ne |mu |te |pp | ne| ko|m n|i a| ku| ñu| te| mu|baa|u n|ko |u a|mba|a s|e a|ay | wa| lu| do|ar | ni|u m|nit|oo |épp| ta|oom|gu |t k|i b|ku |u k| it|éew|rée| ré|u y|xal| aa|kk |i d| bu|doo|i w| bi|war|u c| yi|aay|llu| li|fee|loo| xe| xa| ya|taa| di|yi |ama|on |u j|yu |eex|ew | yo|boo|xee| bo| wà|àll|wàl|mi |o c|ir |mën| më|yoo|ul | gu|nn |en |oot| du| so|oon|e m|dam|een|u d|i n|uy |eet|i m|ara| ba|bu |a a|ata|okk|aad| lé| ay|ju |ada| nj|nam|und|axa|dun|m a|enn|r n|aar|ex |taw|ala| jà| pa|et |di |ën |ana|ral|ota|k s|awf|naa|wfe| gi|u l|igg|aju| dë|ma | aj|ti |u t| se|ax |gée|mbo| ja|ool|bii|li |a m| ke|see|m c| ye|i l| ng|yam|ngu| yu|w m|an |ken|n w| lo|i s| me| de|m m|i t|om |u x|n t| an| mi|jaa|laa|ee |bok|lig|p l|n m|t y|ggé|k l|a l|lép|àpp|jàp|aam| jë|aax|ekk|nd |góo|ewa|ndi|tax|a d| da|amu|éey|gi | su|k c|n n|l b|o n|k t|p n|jàn|àng|gir| jo|a c|n a|n c|ñoo|i ñ|a n|kaa|ba |m g|le |une|kan|e b|la |nda|lee|i j|ang|aat|k n|ey |ant|iir|a y|l a|e n|nan|añu|men|j a|ok |k i|nee|l x|omi|i c|oxa|aw |g m|dox|nte|opp|u w|ngi| mo|omu|y d|are|i k|aan|em |du |a b|njà|ñ ñ| ti|m r|kun|ddu|ali| së| la|eg | ma|ëra|ng |xam|mul",
    "nds": "en |un |at |n d| da| de| un|een|dat|de |t d|sch|cht| ee| he|n s| wa|n e| vu|vun|ech|rec|ht |er |ten| to|tt | si| re|ver| ge|nne|t w|n w|ett|n h|n v|k u|n u| el|gen|elk|lk |t u|ien|to |ch | ve|wat|sie|war|het|it | an|n f|ner| mi| in|ann|rn | fö|ör |r d| fr|t r|hte|orr|ich|för| sc|rie|eit| or|den|nsc|ege|fri|rer| st|t g| up|aar|t a|nd | is|ll |rre|is |up |t e|chu|rt |se |ins|daa|lt |on |t h|oon|che|all|n g| ma|rrn|min| se|ell|hei| na|t s|n i|n a|nn |len| sü|in |rd |nen| we| bi|n m|e s|ven|ken|doo|sse|ren|aat|e m|ers|n t|s d|n b|lle|ünn|t t|n o|ik |kee|e g|t v|n k|hen|arr| dr|heb|lie|ebb|e v| al|e a|llt| ke|hn |he | wi|cho|ehe|ok |ard|sta|men|ill|gel|tsc| ok| do|an |düs|ene|erk| gr| dü|weg|ie |ede|ieh|r s|sün|üss|und|raa| dö|röf|drö|t m|ats|öff|e f|ünd|e w|dör|ens| gl|rch|sik|ig |kt |örc|ere|gru| ün|ff |ahn|nre|mit|st |al |aal|hon|ert|kan|nat|der|dee|enn|run| so|eih|lic|ehr|upp|iht|nwe| fa|pp |eke|e r|unw|t n|taa|hup| ka| be|bbt| wo|p s|el |as |t f|bt |e e|nee|maa|huu|eve|nst|ste|mee| ni|inn|n n|ern|iet| me|hör|dde|ent|n r|t o|öve|are|arb|ite|ter|l d|ach|nic|bei| as|lan|t b|d d|t i|ang|ame|rbe|utt| ut|pen| eh|uul|iek|hr | ar|r t|ul |e d|art|n ü|one|eer|na |nte|mut|ete|üd | mu|üüd|lüü",
    "vmw": "tth|la |thu|a e|na |hu |kha|a m|we |ana| mu|a o|awe|ela|ni |ala|hal|edi|to | ed|ire|dir|eit|ito|rei|ya |a n|wa |mut|a w| wa| ni|akh|aan|u o| on|o y|okh|utt|a a|haa| n’|wak|nla| wi|ari| yo| si| ok| ot|iwa|ka |iya| sa|ne |apo|lap|ale|le | oh|oth|att|the|mul|aka|oha|kun| el|aku|oni|mwa|ha |e s|unl|tha|ott|ele|ett|e m|o s| va|ene|e n|e o| ya|oot|hav|ade|ihi|iha|ihe|de |o o|e a|eli|hen|amu|e w| aw|hel|dad|ra | at|po |i m|lel|wi |o n|owa|e e|ula| en|ta |o a|i a|moo|waw|ina| ak|ota| mo|sa |a s| so|han|ara|var| kh|a i|ri |aya|itt|anl|row| mw| et|i o|ika|’we|nro|i e|n’a|her|lan|nak|sin|lo |elo|vo |u e|eri|n’e|oli|thi|u a|a’w|ida| ah|a v|liw|kan|him|lib|yar|riy|ona|onr|erd|wal|hiy|aa |ibe|rda|wan|ber|era|avi|hiw|nna|i v|hwa|lei|mih|vih| ep|khw|ntt| na|ko |ia |sik|aha|iwe|e k|hun|una|mu |avo|ikh|laa|riw| ma| an|e y|kel|’el|huk|u y|phe|kho|pon|i s|nid|upa|ath|ila|yot|eko|ali|tek| es| it|o e|uku|wih|nan|tte| a |mur|’at|i w|ani|ulu|nih|wel|lik|ira|ane|a y|nkh|saa|ro |n’h|wir|i n|ile|som|u s|hop|inn|ei |ont|kum|yaw|saw|iri| eh|tel|tti|ola|aki|mak|ret|uth|nnu|a k|nuw|ahi|enk| il| nn|ena|va |yok|ute|soo| pi|lal|ohi|hik|mpa|uwi|lih|har|kin|aph|ma |ope|man|ole|uma| oo|mpw| v’|nal|ehi|nin|uni| ek|khu",
    "ewe": "me |ame|e a|le |wo |kpɔ| am|ɖe |ƒe | si| me| wo|be |si | le|sia|esi|la | la|e d| ɖe| kp|pɔ |aɖe|e l| be|e w| ƒe|e e|dzi|na |nye|a a| du|ye | ŋu| na|duk| dz|ukɔ|e s|ome| mɔ|e n| aɖ|kpl|nya|gbe|e b|e m|ple|ɔkp|ɔ a|pɔk|woa|ɔ m|kɔ |evi|nɔ |ŋu |ke | nu|ɔ l|mes|awo| o |iwo|ɔnu|e ɖ| ab|ya |ekp|e k|ɔwɔ|u a| al|nu |ia |ɖek|e ŋ|kpe|ɔme|o a|iny|zi |dze| ny|o k|eme|eƒe|o n|iam|egb|mɔn|blɔ|i n|wɔ |a m| eƒ|o d|alo|siw|ɔɖe|lo |o m|eke|e g| bu|eny|ubu|ŋut|ɔ s|bub|lɔɖ|enɔ|meg|akp|abl| ha|e t| ta| go|mek|eɖo|ukp|li |nɔn|to |any|a l|etɔ|ɔ ƒ| ey|e h|nuk|gom|ɔ ɖ|ɔe |bɔ |ɖo |i s| to|anɔ|a k|ɔnɔ|e x|awɔ|e ƒ|tɔ | ƒo|mev| es| ɖo|ɖes| xe|i w|tso| wò|wɔw|mɔ |iaɖ|i l| ag| li|ã |o ƒ|odz|a s|agb|yen| ts|bu | he|bet| gb|o e|ewo|a e|ɔna|i d|ti |ele|dɔw| ka|i a|uti|peɖ|ta | an|afi|a ŋ|a ƒ| ad|ƒom|se |ɔwo|xex|exe|oma| ma|vin| dɔ|o l|wɔn|eye|a n|i t|vi |ɔ b|so |edz|gbɔ|ɖev|ado| se|ɔ n|oto|ene|eɖe|xɔ |nan|ɖod| af|ben|zin|ee |de |ɖok|dzɔ|gɔm|adz|ɔ k|wom| gɔ|uwo|i ɖ|a d| vo|a t|o g|i b| xɔ|oɖo|i m|e v|ats|o ŋ|sɔ |ovo|i e| at|vov|ne |ɔ e|kat|o s| ne| aw|da |wòa|eŋu| as|asi| el|o t|yi | sɔ|men|a b|ze |mee|uny|te |dom| ak|man|ẽ |i o|ie |ana|ata|ui |axɔ|u k|ɖoɖ|tsi|ema|rɔ̃|ded|ɔ g|ena| en|kɔm|met|u s| eɖ|oku|kui|mew|xem",
    "slv": " pr|in | in|rav|pra|do |anj|ti |avi|je |nje|no |vic| do|ih | po|li |o d| za| vs|ost|a p|ega|o i|ne | dr| na| v |ga | sv|ja |van|svo|ako|pri|co |ico|i s|e s|o p| ka|ali|stv|sti|vsa| ne| im|sak|ima|jo |dru|nos|kdo|i d|akd|i p|nja|o s|nih| al|o v|ma |i i| de|e n|pre|vo |i v|ni |red|obo|vob|avn|neg| bi|ova| iz|ove|iti|lov|ki |jan|a v|na | so|em | nj|a i|se | te|tva|oli|bod|ruž|e i| ra| sk|ati|e p|aro|i k| ob|a d| čl|eva|rža|drž| sp|ko |i n| se| ki|ena|sto|e v|žen|nak|kak|i z|var|ter|žav| mo|di |gov|imi|va |kol|n s| z |mi |ovo|rod|voj| en|nar|ve | je|pos|a s|ego|vlj|jeg| st|h p|er |kat|člo|ate|a z|enj|n p|del|i o|lja|pol|čin|a n|ed |sme|jen|eni| ta|odn| ve| ni|e b|en | me|jem|kon|nan|elj|sam|da |lje|zak|ovi|šči|raz|ans|ju |bit|ic | sm|ji |nsk|v s| s |n v|tvo|ene|a k|me |vat|ora|krš|nim|sta|živ|ebn|ev |ri |eko|o k|n n|so |za |ičn|ski|e d| va|o z|aci|cij|eja|elo|dej|si |nju|vol|kih|i m|nst|kup|kov|uži|la |mor|vih| da|h i|lju|otr|med|o a|sku|rug|odo|ijo|dst|spo|tak|zna|edn|vne|ara|ršn|itv|odi|u s|čen|boš|nik|avl|akr|e o|vek|dno|oln|o o|ošč|e m|ta |vič|bi |pno|čno|mel|eme|olj|ode|rst|rem|ov |ars| bo|n d|ere|dov|ajo|kla|ice|vez|vni| ko|ose|tev|bno|užb|ava|ver|e z|ljn|mu |a b|vi |dol|ker|r s",
    "ayr": "apa|nak|aka| ja| ma|ata|ana|aña|asi|aqe|cha|aki|ñap|jha|mar|aw |kan|ark| ch|una|aru|paw|ti |jh |pat|jaq|rka| ta|a j| ar|hat|ama|tak| wa|ach|iw |a a|ani|a m|spa|na |kap|ki |taq|pa |jan|sa | uk|qe |kis|kas|ha |ina|niw|may| kh| am|at |ati|pan|i j| ya| mu|iti|ka |ayn|t a|as |amp|ch |a u|an |pjh|yni|mun|iña|uka|ajh|ru |w k|hit|ñan|h a|is |isp|qen|khi|isi|has|ejh|e m|sis|atä|oqa|nch|rus|kam|siñ|han|mpi|kañ|qha|sin|asp| in|ham| uñ|ñat|hañ|qat| sa|yas|yat|ita|äña|ska|tap|asa|kha|sit|täñ|tha|arj|ma |a t|ta |tas|nka|sti|iri|sna| ji|a y|ara|pas| as|ñja|rjh| ku| ut|hap|tat|kat|tis|pi |apj|jam|noq|aya|i t|i u|ukh|ura| ka| ju|ans|qas|uñj|asn|a c|nin|aqa|kaj|nañ|sip|i a|us |i m|kun|w u|anc|api|ino|ili|uya|pac|tan|jil|ña |lir|utj|w j|s a|ipa|chi|kiw|w m|kak|muy|pis|rak|hac|isa|njh| lu|mas|amu|ena|nsa|w t|nan|ali|s j|ink|tay| a |upa|wak|a k|way|wa |in | ay|tañ|s m|jas|mp |lur|ank|khu|rañ|h j|t m|iru|eqa|ayt|yt |heq|che|anq|en |lan|rin|ipj|i c|mat|qpa|aqh|tja|awa|uki|k a|qej|anj|sap|pam|usk|yaq|kar|nip|llu|wal|run|yll| aj|lin|a w|ayl|n m|jac|isk|naq|ast|h u|ni |ath|a i|ayk|jhe|aqp|h k|uch|inc|hus|sar|s u|s w| pa|nap|ap | un|ak |n j|tir| ak|ns |s c|ust|arm|ask|war|ri |man|pit|qer|juc|sir|n w|hik|ika",
    "bem": " uk|la |uku|wa |a i|a u| mu|kwa|ali|ya |shi|a n|amb| na|sam| pa|ula|ta |nsa|fya| no|nga| ya|mbu|bu |ata| in| ku|a m|lo |se |nse| ba|ntu|kul|ons|ala|ang|ins|aku|li |wat|mo |tu |alo|a a|ngu|ili|nok|ika|na |nan|a p|ing|a k| al|mu |gu |o n|sha| ca|ila|oku|e a|ikw|yak|ka |lik| um|ana|lin|yal|ga | ci|aba|lwa|ku |ish| fy|uli|a b|u u|unt|i n| on|kal|lil|u y|ba |hi |ukw|amo|po |ulu|kan| sh|kup|ko |we |and|a c|aka|le |u n|cal|o u|ha |ile|ama|umu|bal|kus|akw|u m|mul| if|o a|kut|nsh|o b|ung|apo|e n|kub|mun|uci|yo |mbi|nka|cit|bul| ab|any| bu|pa |ne |u c|u b| ka|abu|ndu| fi|e u|a f|ton| ne|ant|no |i u|u a|ban|o i|cil|cin|ify| ng|pan|tun|gan|nda|kuc|kwe| ns|o c|ngw|o f|ans|fwa|a l|pam|tan|ti | am|kum|kuk|lan|u s| is|wil|du |nya|und| ic|e k|wal|aya|bi |bil|ubu|ush|fwi|int|nta|utu|twa|wab|afw|ela|o m|uko|ako| ta|lam|ale|gwa|win|u k|apa|ma |onk|way|kap|i k|imi|a o|upo| im|iwa|mba|o y|ngi|ici|pak|lul|ind| ma|e p|de |nde|gil|e b|iti|uti|ilw|a s|imb|da | li|uka|hiw|umo|pat|afu|kat|ine|eng|fyo|bun| af|uma|kuf|alw|til|ita|eka|afy|mas|e y|tul|but|nto|usa|kwi|mut|i i| ak| ap|bom|umw|sa |ont| wa|ilo|u f|baf|fik|ina|kab|ano|pal|ute|nab|kon|ash|bwa|ifi| bo| bw|lya|atu|ubi|bik|min|aik|cak|nak|men|ubo|ye |hil",
    "emk": " ka|a k|ka | la| a |la |an |kan| ma|a l|ni |ya |na |ama|a a|lu |n k| di|ɛɛ |di |a m|ma | bɛ| ja|ana|a b|aka|bɛɛ|man|iya|a d|ara|dɔ |jam|alu|en |a s| si| sa| mɔ|mɔɔ|ani| ye| dɔ| tɛ|ye |i s|i a|den| ba|riy|tɛ |sar|ɔɔ |da | al| kɛ| ni|ari|ila|a j| i |a t|n d|ɛn |ɲa |kak|ra |ada|ɛ k|i k|i d|len|u d|ele|nna|sil|n n|n m|olo| se| bo|ade|aar|ɔdɔ|ɛ d| kɔ|ɔ a|ank|ɔn | fa|fan|a ɲ|se |lak|lo | da| na|bol|kel|e k| wo|i m|aya| ke|ko | ad| mi|nu |baa| sɔ|dam|nda|ɔnɔ|mɛn| ko|a f|and|ala|ɛ y|ɔ b|ɛ s|le |ɛ m|i l|i b| wa|n s|a i| de|ina|li |ɔya|mad| mɛ|aba| le|n a| ha|a n|ɔ s|u l|nɲa|han|n b|sɔd|dɔn|kɔn|kɛ |ata|nɔ |kar|dan|in |u k|ɔ m|kɛd|ɛda|i j| su|nnu|a w|ɔ k|nka|lat| gb|ɲɔɔ|aji| an|a h|nin|olu|u m|kun|a g|on |asa| ku|ibi|jib|don| lɔ|i t|waj|bɛn|ɛnn|ban|ɔrɔ|wo |ran|si |ɛ b|ɛnɛ|ɛ l|mak|suu|e m|ii |i f| ɲi|e a|o m|ɲin|enn|usu|ba |ɛdɛ|yan|taa|nan|u b|u t| ɲa|nal|nba|ɲɛ | ɲɔ|law|ati|nad|rɔy|hɔr|a y|iri|sii| hɔ|mir|ti |enɲ|bɔ |u s|n t|u y|ini| te|ta |kol|enb|awa|bat| fu|nki|kil|ili| du|bar|ɛ j|fɛn|fɛ | do| dɛ|gbɛ|su |uus|aam| ta|afɛ|may|lɔ |nni|ɔnn|lɔn|maf|o a|e d| bɔ|din|sab| fɛ|ɔ j|o y|i w|tan|ɔɔy|dɛɛ|bɛd|kad|min|ɔlu|dal|ɔɔl| tɔ|ɔɔn|e f|biy|ali|e b|kɔd|te |wol|bi |e w| mu|ida|du |ant|nɛn|dɛ |ɛ a|dah",
    "bci": "an |be | be| ɔ |un | i |ran|sra|wla| sr|kwl|in |la | kɛ|n b|kɛ |n s|n k| kw| ng|n n|lɛ |a b|n m|le | nu|a k|nun|i s| a |man|n i|ɛn |e k|ɛ n|kun|n ɔ|mun| ni| ti| mu|nin|nga|ti | n |ɛ ɔ|e n|ɔ n| su|ga |ɔ f| fa| ku| li|e s|su |a n|a s|a ɔ|ɛ b|i n|e a| sɔ|wa |sɔ |i k| ma| le|ɛ i|tin|ɔ k|di | at|ata|ta |ɔ l|fat| mɔ|ati|mɔ |lik|akw|ɛ m| sɛ|lak|e w| sa|dɛ |ndɛ|mɛn|i b| mm| yo|iɛ |ba | nd|nvl| nv| kl|vle|sɛ |a a| mɛ| fi|ke |und| wu|ɛ s|n a|mml|liɛ|mla| ka|ike|yo |ɔ t|ngb|i a|e b|a m| an|ɔ ɔ| di| yɛ| si| bo|e t|ndi|bo | ye|o n|n t|e m|fin|e y|n f|sa |ɔ b| fɔ|dan|n y|fa |i i|uma|yɛ | ju| ny|ɔ i|nan| na|kan|ɔun| tr|wun| b | o |n l| aw|a y|b a| wa|fɔu|i f|ɛ a|ing|ge |uɛ |i w|a w|nge|klu|ka |gba|e i|awa|o m|jum|ɔ y|ɛ k|wie|a i|ie | fl|e f| wl|tra| ba|lo |lun| ak|ang|ye | wi|e l| kp|uan|i m| uf|uwa|n w|sie|flɛ|kpa|alɛ|luw|flu|o i|kle|ua | da|nyi|nzɛ|wuk|ɔ s|wo |e ɔ|ika| wo|wan|bɔ |ian| bl|wlɛ| bu|anz|o ɔ| af|aci|u b|bu | ya|ɛ w|ufl|bɔb|te |zɛ |ɔ d|a t|elɛ|i t|ci |nua|fuɛ|ɔbɔ|u i|anm|i l| w |w a| bɔ|o b|lu |se |u m|ilɛ|iɛn| ja|a j|afi|i ɔ|n u| se|unm|nda|yek|bɛn|gbɛ|eku|ɛ l|nma|kac|u s|san|ko |o y|o s|a l|u n|si |anu|aka|any|ɛ d| ko|n j|ɔ w|u a|fi | yi|anw|i j|uka|fiɛ|a d|o a|lel| kɔ|ɔlɛ|ɔn |a f",
    "epo": "aj | la|la |kaj| ka|oj | de|on |de |raj| ra|iu |ajt|as |o k| ĉi|e l|j k| li| pr|eco|aŭ |ĉiu|jn |ia |jto|est| es| al|an | ki|pro|io | ko|en |n k|kon| ti|co |j p|o d| po|ibe| aŭ|ro |tas|lib|ber|aci|toj| en|a p| ne|cio|ere|ta | in|to |do |o e|j l|n a|j d| se|a k|j r|ala|j e|taj| re|rec|iuj|kiu| pe|o a|ita|ajn|ado|n d|sta|nac|a a|nta|lia|ekt|eni|iaj|ter|uj |per|ton|int| si|cia| ha|stu|a l|je | je|al |o ĉ|n p|jta|tu | ri|vas|sen|hav|hom| di| ho|nte|a e|ali|ent| so|nec|tra|a s|ava|por|a r| na|igi|tiu|sia|o p|n l|ega|or | aj|soc|j ĉ|s l|oci|no | pl|j n|kto|evi|s r|j s|ojn|laj|u a|re | eg|j a|gal|ers|ke |pre|igo|er |lan|n j|pri| ku|era|ian|rim| fa|e s| ju|e a|ika|ata|ntr|el |is |u h|li |ioj|don|ont|tat|ons| el| su|go |un | ke|ebl|bla|n s|oma|ĉi |raŭ|kla|u r|ne |ili|iĝo|o t|s e|tek|men|nen|j i|nda|con|a d|ena|cev|moj|ice|ric|ple|son|art|a h|o r|res| un|u s|coj|e p|ĝi |for|ato|ren|ara|ame|tan| pu|ote|rot| ma|vi |j f|len|dis|ive|ant|n r| vi|ami|iĝi|sti|ĝo |r l|n ĉ|u l| ag|erv|u e|unu|gno| ce| me|niu|iel|duk|ern| ŝt|laŭ|o n|lab|olo|abo|tio|bor|ŝta|imi| ed|lo |kun|edu|kom|dev|enc|ndo|lig|e e|a f|tig|i e| kr| pa|na |n i|kad|and|e d|mal|ono|dek|pol|oro|eri|edo|e k|rso|ti |rac|ion|loj|j h|pli|j m",
    "pam": "ng |ing|ang| ka|an | pa|g k| at|ala|g p|at |apa| ma|kar|lan| ki|ata|kin|pam|g m|ara|tan|pan|yan| a |pat| in| ba|aya|n a|g a|ung|rap|ama|man|g b| ni| di|nin|din|n k|a a|tin|rin|a k|ami| la|tun|n i|ari|asa|nga|iya|ban|ati| me|nan| da| sa| na|t k|gan|g s|bal|etu|mag|a i|met|sa |la |ant|kal| iy|kap|a n| mi|in |ya |aka|tau| o |san|n d|au |lay|ana|mak|yun|na |ika|a m|ipa|ran|atu| al|n n| ta|ti |ila|g l|ali|kay|nsa|aga|a p|iti|g t|par|u m|ans|nu |al |g i|t p|iwa|a d|syu|t m|sab|anu|un |uli|mip|ra |aki|aba|u a|mal|as |mil| it|una|bla|abl|ita|awa|kat|t a|ili|kas|g n|lag|da |tas|i a|wa |n l|lal|dap|mas|bat| pr|abi|ap |a b| e |mik|ani|sal|li |ad | an|ral|ira|gal|a r|lin|g d|nte| li|ale|kab|e p|ula|wal|lit|nti|s a|lip|nta|pro|te |ie |wan|ag |tu |upa| ya|g e|tek|usa|g g|bie|o p|it |pun|ian| bi|lat|aku|be |n p|sas|iba|yat|alu|tul|e m|kan|l a|nap|t i|lir|u k|isa|pag|abe|len|e k|rot|en |bil|mam|ksy|ngg|lam|p a|ily|liw|eks|ote|n o|gga|u i|eng|ipu| tu|lya| ri|aul|pas|dan|uri|ema|lab|ta |lak|are| ar|ail|tam|o a| ke|ril| pe|sar| ra|ina|asi|ka |art|pak|sak|mit|rel|i k|gaw| ul| re|inu|i i|mun|abu|asy|mba| pi|ags|obr|gpa|a o|am |n m|mem|o k|isi| mu| nu|mis|nun|era|ndi|ga |agp|aun|mab|anm|lub|gla|e a|nme",
    "tiv": "an | u | sh| na|nan|en | a |ha |sha|shi| i |er |a i| er|or | ma|ar |gh |n i|n u|a m| ve| ci|n s|han|u n| ke|lu |man| lu|n m|yô |a u|u a|n a|r n|a k|mba|in |ii | ha|kwa|ken|n k|na |hin| mb|a a| kw|n n| ga|ga |cii|agh|a n|aa |wag|ve |a s| yô|nge|ba |r u|u i| gb|ana| or|a t|mao|r i|ity|ma |aor|anm|nma|gen|oo | ta|ir |ren| kp|i n|ang|r m|e u|gba| ng|r s| ia|ere|ugh| it|ian|doo|ese|uma|kpa| la|u k|n g|ngu|gu |om |oug|on |ol |a h|ior| ts| he| ne|tar|h u| ka|la |n t|se |e n|r a|a v|hen| ku|aha|mac|yol|i u|ace|ge |ce | de|ish|u t| io| do|tom|hi |a e|u u|o u|i m|iyo|i d|bar|ave|ua |u s| te|igh|a l|e a|m u|a w|un |n c|n e|ne |ev |r k|ind|ene|sen| is|ndi|ker|era| to|a o|ima|u v|a g|paa|n h| wo|di |yar|tya|ase|e s|de |n y|ee |end|him|tes| mk|u m|ka |tyô| mz|won|u e| um|u h| wa| mi|yan|tin|ran|ie |hie|a c|hir|i a|e k|i v|mak| in| za|r c|nen|e l| ig|i k|kur|nah|tse| ik|ves|eng|rum|mzo|men|zou|i l|e i|a d|i e|i i| ya| vo|mlu|ô i|inj|nja| as|vou|ura|ron|gbe| iy|r t|ôro|a y|oru|e e| zu| ti|ra |n l|ci |u l|ver|kpe| fa|was| ml|e m|em |io |mi |da |civ|môm|ant|see|ivi|wan|vir|nda| ij|soo|zua|lun|ea |vea|wa |ôm |av |hio|ake|a f|igb|l i|u z|r l|zan|nta|e g|hem|h s| mt|ded|iky|o s|r g|do |ndo|iji| hi|e h",
    "tpi": "ng |ong|lon| lo|im | ol| na|la | ma|pel|ela|ri |at | bi|ait|na | yu|ol |gat| ra|bil| ka|ilo|man|rai|t l|it |eri|mer| o |wan| i |mi |umi| wa|ing|yum|ta |t r|tin|eta|get|lge|olg|iga| ig| sa|ara|em |rap|i o|ap |nme|anm|in |ain|an |a m|ant|ape|nar|m o|i n| no|g o|g k|i i|as |ini|mas| me|n o|sim|tri|kan|kai|ntr| ga| st|a s| pa|gut| ha| wo|g y|yu |a l|g s|ama|m n|ok |g w|wok|spe|a k|i b|i m|g l|i l|sin|sam|pim|m l|kam| gu|l n|amt|tpe|g n| in|ts |a i|mti|utp|isp|kim|its| la|isi|aim|api|lo |o m|g b|tai| di|a o|dis|a t|p l|en |map|t w|s b| lu|luk|sem|no |tim|lai| ko| ki|ave|ols|nog|m k|lse|sav|nem|ve |a p| fr| em|nim|tu |i y|nka|et |m y| ti|g t|nap|g p|sta|tap|aun|a n| tu|un |asi|fri|pas|n m|m g|l i|aut|ane| sk|kau|t n|nta|sen|n s|oga|i g|g g|m i|kis|o i| ba|tok|os |usi|m s|ngt|anp|a w|s n|a h|s i|iki|i s|sai|l m|npe|ari|o l|o b|g r|ik |uti|iti|gti|aik|ut | to|a g|ili|a y| pi| ta|kin|ni |n b|lim| ye|yet| we|k b|ina|g m|uka|str|ins|rid|a b|anw|nsa|nwa|m w|m m|dom|ot |hap|ido|aus|i w| ne| si|n i|t o|dau|ese|rau|ank|sap|o k|m b|nin|pos|o n|am |go |s o|s l|u y|pik|vim|ivi|es | go|n n|kot|ron|ple|g d|a r|kul|ali|sku|apo|om |g h|l l|s s|ti |les|t m|gav|eki|nai|mek|kom| as|ind|nda|ip |liv|ul |ati",
    "ssw": "nge|eku|a n|ntf| le|e n| ng|tfu|lo |la |nga| ku|fu | ne|o l|khe|tsi|nkh|le |he |unt|elo| lo|si |ele|a l|ni |ung|mun|ma |lun|lel|wa |lek|nom| um|eni|oma| no|kut|hla|onk|a k|e l|ent|e k|gel|ela|ko |eli| ba| la|pha|ats| em|o n|ang|ema|eti|nel|nye|ban|ulu|uts|hul| na|aka|tfo|e u|lan|oku|lok|won|khu|esi|lul|a e|ule|ala|umu|tse|akh|ye |ve |i l|nek|ana|ane|lil|kwe|aph|na |we |ke |aba| wo|nti|ndl|ale|i n| ye|ba |ilu|gek|gan|lab|any|hat| li|tin|wen|gen|kel|len|ndz|fo |and|let|eko|e b|lwa| ka|te |set|nem| kw|mal|ka |ant|alu|ne |phi|ing| un|u u| ek|ise|une|e e|kul|nal|lal|mph|o y|uhl|fan|‐ke|ile|i k|kub|ukh|ben|kan|ako|a b|kat|eke|ive| ti|sek|nak|sit|seb|u l|alo|yel|kho|wo |kha|les|o e|ngu|kus|lom|ini|ikh|elw|isa|sa |fun|e w|ebe|o k|jen|iph|eng|kwa|ahl|uph|emb|be |tis|lwe| si|etf|isw|uma| se|ene|ta |nan| im|i e|enk|e a|abe|kun|ume|hak|nen|dle|ase|sen|kuv|tel|ebu|omu| in|lin|sel|tfw|nhl|a i|e i|kuk|uba|ti |kuf|mhl|bon|ula|sin|int|fut|dza|lak| wa|ind|ave|ali|yen|ete|to |ngo|use|kuh|hol|ze |a‐k|ona|a a|se |nje|und|swa|lon|eki|ike|i a|lis|tsa|gab|sim|i w|its|fol|e t|o m|hi |ndv|phe| ya|ma‐|utf|sik|liv|bun|cal|nta|ata|gal|mel|ute|wem|gap|han|uny|oba|alw|ili|a w|mbi| bu|gob| at|awo|ekw|dze|u n|emp",
    "nyn": "omu| om|ntu|tu | ku|a o|ra | ob|wa |obu|ari|a k|mun|a n|unt|mu |uri|nga| mu|aba|ri |a e| na|e o|gye|rik|ho |a a|han|ang|re |ga |iri|bwa|oku|aha|bur| bu|na |eki|ka |iku|ire|uga|ndi|ush|ban|ain|ere|ira|we |kur|sho| ek| ab|ne |ine|a b|and| ni|u a|e k|sa |u b|iha|i m|e n|kir|be |aho|bug|ibw| eb| ba|ing|ura|gir|u n|kut|ung|ant|abe| ah|ye |e b|i n| bw|kwe|ebi|era|iki|ba |ro | kw| ok|uba|gab| no|zi |bir|i k|u o|o o|rwa|o e|kub|end|ama|mer|eka|kug|ate|tee|di |rir|bus|kuk|rin|ish|sha|i b|wah|ha |u m|bwe|ngi| ai|ara|kwa|kan|o g|za |ngo|kuh|ana|i a|eme|eek|i o|baa| ka|go | gw|nib|zib|ash| or|iro|she|o k|u k|iin|o b|iba|oon|gan|agi|ngy|hem|mwe|ona|oro|bwo| ar|ya |i e|uru|nar|eir|uta|tar|kwi| ti|egy| n |hi |bar|isa|ute|o a|shi|ora|e e| en| ki| nk|riz|nda|da |ja |si |nsi|wen|yes|tek|yen|aga| am|o n|rei|rag|ki |obw|mur| ha|ris|wee|amb|aab|bya|kus|ugi|a y|ind|ata| ne|bas| ky|ija|hob|ikw|mus|gar|a g|eky|dii|bor|aar|ibi| we|aka|ham|emi|ekw|rer|ini|har|gi | bi|naa|kor| er|gwa|n o|iza| by|eih|yam|iho|rih|i y|ete|o m|eby|but|a r|ika|mag|ozi| em|ong|iik|iko|uka|nik| yo|sib|eri|utu|tuu|amu|uko|irw|nka|ani|yaa|u e|mut|roz|mub|ens|aij|nis|uku|kye|nde|der|e a|nok|nko|asa|aas|hab|obo|ent|ahu|rye|oba|kih|yob",
    "yao": "chi|ndu| wa|du | ch|a m|aku|akw|ni |kwe|und| mu|wak|wan|mun| ku|la |e m|wa |ulu|amb| ak|kut|u w|ali|mbo|lu |we | ma|le |ufu|ful|ila|a k|bo |a n| ga| ni|amu|kwa|se | na|ose|hil|nga|go |aka|and|ang|na | uf| pa|ete|uti|jwa|kul| jw|son|ngo|lam|e u|ne |kam|oni| so|u j|e a|ele|a c|ana|wal|ti |isy|cha| yi|gan|te |ya |mwa|lij|wet|che|ga |yak|ili|pa |e n| ya|o s|nda|i m|ula|jos|i a|ile|ijo|li |e k|o c|a u| mw|ich|mul|uch|o m|asa|ala|kas| ka|i w|ela|u a|ach|his|nam|lan|yin|i k|ind|ani|sye|yo |si |pe |gal|iwa|man|sya|aga|a w|o a|ule|ikw|asi|kus|ope|ma |gak|e w|jil|kap|hak|ika|ite|aji|mba|u g|ase|mbi|kum|uli|any|ape|a y|ekw|mal|imb|ja | al|end| ng| ja|mas|usi|kup|e c|pen|ye |anj|ka |a j|a p|lem|o n|ama|him|ago|sen|eng|ane|ako|mch|ola|och|oso|ena| kw|sop|lek|pel|gwa|hel|ine|gam|u y| mc|i y|awo|ons| mp|ole| li|wo |i u|hik|kol|auf|mka|tam|syo|e y|mpe|ten|ati|mau|nji|wam|muc|ong|i g|kan|uma|je |iku|nag|kwi|da | ul|cho|ngw|ene|iga|ano|esy|ion|upi|pag|o k|eka|wu |uwa|kuw|sa | un|a l|bom|iya|uni|jo |ale| ji|apa|yil|lil|uku|i n|o g|a a|o w|waj|mus|ipa|pan|pak|one|i c|ujo|duj|emw|nya|tio|jak|oma|nja|hiw|dan|apo|e j|poc| wo|lic|alo|eje|ing| mi|e p|lo |lig|a s| yo|ung|no | m |upa|ata| bo|nde|he |i j|was",
    "lav": "as |ība| un|un |tie|ies|bas|ai | ti|esī|sīb|ien| vi|bu |vie|ir | ir|ību|iem| va| pa|em | ne|s u|am |m i|šan|u u|r t|pie| ci| sa|ās | uz|vai| ka| pi|brī| iz|rīv| br|uz |cij|dzī|ena| ar|ar |isk|s p|es | at|āci| ap|ot |nam|viņ|inā|ikv|kvi| no|s v| ie|vis| ik|i i|pār|u a|ju |nu | pr|edr|vīb|īvī|iju|drī|u p|dar| st|lvē|cil|ilv|s t| la|iņa|ana|s i|n i|īdz|s s|kā |tīb|i a|ija|bai|ībā|ied|s n|arb|val|līd|s b|aiz|tu |iec|cie|ām |gu |vēk|īgu|īgi|ka |jas|umu|mu |t p| jā|u v|zīb|ska|lst|als|kum|gi |s l| tā|jot|stā|st |n v|vēr|a p|arī|aut|n p|ama|kas|u k| da| ta|nīg|izs|ojo|anu|ņa |u n|sta|s a|ba | ai| so|s d|a u|ā a|stī|cīb|m u|i u|son|not|mat|sav|iev|ā v|jum| kā|u t|ned|ajā|s k|u i|i v|līt|ēro| pe| dz|i n|per|u d|īks|kat|nāt|līb|nāc|rdz|nīb|pil|rīk|kst|a s|cit|pam| pā|ekl|tau|u s|bie|jā | re|i p|kur|a a|t v| li|evi|tis|evē|bā |ma |rīb|a v|os |ras|abi|nev|iku|skā| ve|lik| lī|nas|t k|ant|uma|roš|kād|zsa|sar|ciā|mie|ais|eci|oci|oša| je|jeb|būt|atr|n b|ieš|rso|ers|soc|enā|a t|t s|īša| be|bez|āda|ebk| ku|glī|isp|tot|spā|roj|lie|pre|ret|aul|na |tra|iet|du |zgl|āt |ard|kt |ier|izg|ikt|paš|iāl|nod|ts |eja|ā u|sab|eno|ēt |ta |tik|tīt|ecī| de|īga|tar|arp|r j|īst|tās|ja |enī|atv|vu |ārē|rēj|rie|oši|dro",
    "quz": "una|an | ka|nan|cha|ana|as |apa|pas|man|lla|aq |sqa|ta | ru|run|kun|ach|qa | ll|pa |paq|na |nta|chi|npa| ma|nch|aku|anp| ch|in |a r|ant|hay|mi |taq|ay |ama|asq|qan|tin|kuy|chu|lap|a k|yta|a a|ima|wan|ata|spa|all| wa|n k| ja|ipa| ya|nin|ina|aqm|his|qmi|a m| ju|pi |anc|nap|iku|aus|usa|kau|pan|nak|kan| mu|naq|aqt| pa|kam|aqa|kay|i k|kus|un |ank|isq|nku|may|yku|ayn|a j|a l|ayt|qta|ati|a p| pi| ri|aci|lli|lin|ayk|uku| al| at|n r|yac|ion|pip|han|inc|n j|ayp|yni|qpa|nac|say|asp|uy |mac|s m|cio|awa|a c|laq|tap| yu| im|a y|yoq|n m|asi|mun| de|has|n a| as|n c|int|uch|nma|s k|oq |ari|q k|hu | na|ypa| tu|tuk|tun|atu|rim|q r| sa|jat|yan| ji|nat|anm|jin|a s|api|hik|uya|nti|pac|tan|ash|mas|n p|n l|k a|ura| su|a q|yuy|n y|ech|q j|unt|yay|ypi|is |lan| qa|usp|kas| an|a w|s w|inp|sin| ta|ma |a t|shw|q a|hwa|uyt|nmi|sim|ere|rec|der|uma|s t|isp|n t|ña | ni| ay|upa|nam|hur|war|waw|imi|nka|sap|kaq|s j|was|y r|usq|kin| un|inm|qas| si|ani|tiy|t a|sta|pay|pis|maq|hin|ha |arm|npi|rmi|ink|aqp|q c|la |i p|nis|yma|nk | ku|aym|nal|hak|rik| ti|unc|niy|y s|iyo|juc| qh|ist|pap| aj|s y|cho|onq| re|ayo|iqp|n s|s p|os |i m|t i|ras|ita|piq|qsi|ku |yqa|mik|q y|eqs|pat|tak| pu|lak|i r|ipi|iya|ywa|muc|a n| qe|san|jun|y l",
    "rmy": " sh|ri | a |shi|hi |i s|ti |ea |ari|i a| ca|rea|tsi|i c| s |a a|ndr|tu |câ |dre|i n|ept|ptu|rep|li | nd| di| un|a s|are|i u|ats|la | la|i l|ear| li|lje|di |ati|lui|ui |a l| tu|tat|â s|ei |sea| ti| câ|un |jei|or |caf|afi| lu|â t| ar|ali|i t|fi |ilj|a c|bâ |râ |car|ibâ|lor| cu|nâ |icâ|a n|i d|s h|hib|tâ | hi|â a|si |u c|eas|tur|tul|ber|â c| in| co|lib|u a|n a|cu |ibe|u s|tea|lu |tsâ|ul |tse|int|a p|i i| pr|u p|i p|url|i m|lji|min|sti|alâ| al| pi|sht|nal|â n| si|ji |â p|rar|ert|sii|ii |nat|til|u l|sâ |lâ |â l|sta| nu| ic|i f|nu |ist|mlu|ili|a t|ots|uni|rta|a d|its|â d|pri| ts|oml|i e| de| na|sia| po|gur|tut| st| at| ân|ura|al |ita|anâ| ma|ips|can|oat|tsl| su| as| so|ând|nts| ap| ea|sh |nit| mi|ent|a i|ate| ac|poa|ilo|sot|ina|ash|ona| lj|âts|rli|lip|â i|unâ|t c|iti|bli| u |nji| fa|zea|tât|ril| om|urâ|con|i b|sig|igu|ntr|pur|par|ntu|let|com|iil| ni|eal|ind|r s|hti|at |ucr|art|adz|arâ|itâ|rtâ|inj|uri| eg| sc|atâ|sin|ral|pse|asi| ba|r a|apu|âlj|ia |chi| va|sun|ter|rlo|ica| pu|luc|unt|i v|ise|ini|est|ast|gal|ega|act|nda|ead|uts|a u|imi|ma |ra |pis|s l|ets|a o|va |pi |lit|scâ|asc|ial|sa | ta|rim|tar|alt|idi|tlu| gh|era|ant|eri|aes|a m| nâ| ae|oar|nea|pro|apt|ana|ta |atl|lic|l s|iun|nte|mil",
    "src": " de|de |e s|os | sa|tzi|tu | su|one| a |sa |ne | e | in|ent|ion|der|su |zio|ere|as |e d|a s|u d|ret|es | cu|ess| pr| so|s d|men|ale|ade|atz| s |re |e c|sos|in |s i|chi| un|nte|ten|etu|er | pe|et |e e|ida| te|le | is| ch|ene|are| es|a p| si|u s|a d|pro|hi |dad|te |sse|tad|zi |e t| on|e i|s e|nt |nzi|u a|sso|onz| co|ame|cun|tos|e a|sas|a c|ntu|net|na |e p|at |nes|du | li|t d|n s|son|s a| o |ber|ro |pes|u e|int|zia|nat|i p|ia |res|nu |un | re|sta|s p|ter|era| po| di|per|s c|t s|rar|ser| at|e o|s s|ibe|lib|si |tra|ust|u c|rta|unu|cus|ntz|adu| to|da |nal| na|ant|egu|eto|und|ine|i s|a e|otu|u p|t a|ert|est| da|a a| fa|ist|ona|pod|s o|pre|iss|ra | ma|ica|tot|les|ntr|una|sua|con|dae|ae |s n|man|sia|ndi|nid|ada|a l|nta|o s|a i|ua |ide| ne|otz|min|rat|iat| pa|nde|ode|dis|ren|ali|a u|ta |u o|sot|u t|ime|ssi| as|o a|pet|e u|nsi|fun|lid|epe|eru|unt|st |t e|end|us | fu| ca|ner|dos|s f|ass|nda|uni|das|iu |ind|a t|ial|a f|ghe|gua| eg|a n| se|ont|etz|s m|s ò|sti|t p|ual|nen| me|sen|com|ura|a b|lic|a o|pen|ado|nos|inn|des|seg|e f|din|òmi|ire|a m| òm|e l|dep|ènt|for|ena|par| tr|u i|ara|cra|sid| no|s u|u r|suo|e n|pri|ina| fi|ria|gur|art|det|s t| bo|tar|emo|run|ama|icu|isp|dam|e r|itu|cum|tut|eli| bi",
    "sco": " th|the|he |nd | an|and| o |al | in|ae |in |es |ion|cht| ta|tio|or |t t|ric| ri|ich|tae|on |s a|is |e a| aw| be|s t| he|ati|ent|ht |ts |e r| co|er | na| fr|bod|ody|his|dy |hes| fo|e t|o t|for|it |ng |ty |n t| or|be |fre|ree| hi|l a|ing|awb|wbo| sh|s o|ter| on|sha|nat|r t|nal|an |n a| as|hal|e o|y a|d t|tit| pe|l b| re|y h|aw | ma|nt |men|air|ce | pr| a | ti|hts|e f|e c|le |eed|edo|dom|n o|e s|ons|d a|res|e w|man| wi|d f|ed |sta|ar |t o|ona| it|ity|at |as |her|ers|t i| de|con|til|il | st|nti|e p|e i|e g|nce|ny | so| di|nte|ony|ns |und|ith|thi| fu|ie |ir |oun|ont|e e| un|pro|oci|nae|y i|lit|soc|com|nin|en |ic |ne |r a| me|ly | wa|ear|ual| en|ame|uni|r i|e h|hum| is|ane|uma|ess|inc| fa|equ| hu|ver| eq|e m|hei|o h|ms |d o| ha|wi |t n|s f| no|t a|int|cla|rit|qua|d i|iti| se|rsa|y s|ial| le| te|e d|r o|ive|r h| la|nit|om |ite|s r|cie|s i|ali|cti|cia|re |aim|rat|ld |tat|hat|rt |per|s h|n f|dis|tha| pu| we|g a|oms|eil|ntr|fai|tri|ist|ild|e u|r s|dec|lea|e b|hau|imi|mai|s n| ac|elt|lt |l t|omm|d p| ga|din|war|law|eme|y t|era|eir|art|ds |s e|ral|nor|tel|ge |g o|eik|eli|rie|rou|nda| gr|lan|mei|ate| ge|n i|ten|id |s d|ors|iou|bei|sam|nta|sec|mmo|lar| tr|ful|ul |mon|s w|anc|l o|gar|ern|ara|d s",
    "tso": " ku|ku |ni |a k|hi | ni|a n| a |i k|ka |i n|wa | ya| ma|la |ya |na |a m| ti| hi|fan| sv|nel|hu |a t|ane|ela| ka|iwa|u n| na|svi|lo |nhu|a l|a h|ele|le |ndz|u k|va | xi|a w|vi |mbe| à |elo|wu | wu|eli| mu|u y|mun|i l| le|nga|umb|lan|nfa| va|u l|be |u h|li |kum|tik|ihi|iku|aka|unh| wa|a s|liw|isa|i m| fa|ma |anu|nu |u t|han| la| ng| wi|wih| ha|a x|yel|a a|lel| nf|i h|ta |ana|o y|e k| nt|u a|i a|eni| li|ndl|ga |any| ko| kh|van|u w|u v|amb|a y|ti |sa |pfu|i t|i w|in |lek|e y|ang|and|ati|yi | è |irh|sva|mat|ani|i s| nd|a v|mel|yen|hla|isi|hin| ye|eke|n k| lo|ulu|kwe|hul|thl| kw|nth|tin|mah|wan|ava| mi|ko |khu|u s|à n|dle|lul|ule|tir|o l|i y|aha|aye|kwa|inf|à k|è k|rhu|mba| th|fum|end|anh|xi |dzi|kel|a f|u f| lè|we |may|eka|nye|gan|dze|vu |ham|xim|mis|thx|aku|tà |xa |hlo| tà|eyi|ima|nti|eki|ngo| si|u p|vak|ngu|lak|ume|oko|lon|a è|o n|lok| ta|zis|hak|u m|i à|ke |i x|u x|rhi|ha |awu|dza|u à|za | là|n w|ung|e n|a à|i f|esv|les|vik|siw| y |à m|to |mha|ola|sav|ond|nya|kot|kol|uma|e h|mbi|e s|naw|ths| dj|fun|mu |a u|xiw| ts| hl|u d| lw|nyi|ki |ong|sun|lwe|ike|ind|nis|xih|e a|èli|imu|sel|sek|iph|zen|lum| pf| xa|sin|umu|sim|ave|kar|ala|wey|sik|o t|avu|wav|oni|ile|wak| yi|ali| hà|gul|e l|ba |i v",
    "men": " ng|a n|i n|ɔɔ |ti | ti|i l| i | ma| nu| gb|ngi|a k|aa |gi | kɔ|ia |ɛɛ |ei | na| a |ma |hu | ye| ta|kɔɔ|a t|na | hu|a m| kɛ| nd|gbi|ya |bi |i y| lɔ|a h|ɛ n|ii |ɔny|u g|i h|nya|uu |lɔn| kp|i m|ngɔ|nga|la |i t|kɛɛ|lɔ |i k|ɔ t|mia| mi|a y|nge| ji|ee |gaa|a a|ɔ n|ɔ i|gɔ |ind|tao|ao | hi|num| le| yɛ|umu|mu |ung|nda|hin|ye |i g|hou|hug|e n|ugb|ni |a l|sia|ndɔ|nuu|a i|maa| ya|ahu|gba|u k|mah|oun|ɔma|le |da |i w|ɔlɔ|i j| va| ɔɔ|eng|i i|va |yei|dɔl|li |lei| sa|yɛ |kpɛ|yil|isi| la|bat|a w|u n|e t|ta |ahi| ki| wo|ɔ k|e a|ɛlɛ|saw| lo|o k|ji |gbɔ|pɛl|uvu|ili| ho|vuu| gu|nde|aho|gbu|ɛ t|ale|ila|nah|kɛ |ɛi |ndu|kpa| wa|nuv|ge |e m| ny|e k|atɛ|wei|awe|a g| ii|bua|ie |awa|wot|yek|kɔl|ulɔ|ing|ga |gul|tɛ |ɔle|u t|gbɛ|ɔ y|nun|wa |hei|ani|ɛ k| tɔ|bɔm|ɛ g|ein|taa| ha|ang|uni|u i|ekp|ɔ g|lɛɛ|kpɔ|a v|kpe|ote|i b|te |u m|tii|ɔ s| we|ɛ h|baa|pe |ɛ y| ɛɛ|i ɛ| ba|fa |a j|bu |ifa|kia|jif|u l|eke|ama|gen|u w|lee|lɛ | lɛ|ɛmb|a b|e y|aah|hii|ngo|bɛm|lek| wi|ui | yi|u y|bɛɛ| he|u a|e h|ɔ m|uah|o g|yen|yan|nyi|aal|hi |wu |yee|maj|ajɔ|jɔɔ|nye|mbo|e g|u ɔ|ong|ka |oi |lon|dun|uny|ɛng| sɔ|lɔl|nyɛ|lii|a p|oyi|iti| bɛ|lɔm|akp|e i|ɛ i| ka|jis|oko|i p|ɔla| wɛ|a s|ewɔ|iye|dɔɔ|lok|gua|ɛ b| li|u h|nin|wee|lah|ula| ga| du|i v",
    "fon": "na | na| e | ɖo|ɔn |ɖo |kpo| kp|nu |o n| ɔ | nu| mɛ| gb|mɛ |po |do |yi |tɔn| é | si|gbɛ|e n|in | to| lɛ|lɛ | tɔ|nyi| al|wɛ | do|bo |ɛtɔ| ny|tɔ |e ɖ|ɖe | bo|okp|lo |ee |ɖok|to |ɔ e|bɛt| wɛ| ac|a n|sin|acɛ|o t|o a|ɛn |i ɖ|o e|bɔ |ɔ ɖ| bɔ|cɛ |ɛ b| ɖe|a ɖ|ɔ n|ɛ ɔ|n b|an |nɔ |odo|ɛ ɖ|o ɔ|ɛ n|ɛ e|ɖɔ |ji | ɖɔ|lin|n n| en|bi |o ɖ|mɔ |n e|pod| bi|lɔ | mɔ|n a|nɛ |ɛ k|i n|un |ɔ m|i e|mɛɖ| hw| ji| ye|ɛɖe|enɛ| ǎ |alo|o s|kpl|u e|a d|ɔ b| nɔ|alɔ|ɔ é|ɔ g|ɖee|si |n m|gbɔ|a t|n k| yi|sɛn|jɛ |e k| wa|o m|e m|é ɖ| jl|hɛn|e e| hɛ| sɛ|nnu|nun|wa |n ɖ| ee|é n|kpa|unɔ|bɔn|ɔ t|a s|ɛ é|u k|ɔ w|inu|e s|i t|zɔn|o l|a y|o g|bɛ |ma |n t|e j|ɔ s|ɔ a|o b|a z| zɔ|jlo|i k|nuk|ɔ k|a e|ɔ l|u t|kɔn|xu |e ɔ| lo|hwɛ| ka|eɖe|o y|e w|jij|sis|n l|ixu|six| su|ali|isi|ukɔ|ɛ a| ay|ayi|su |n g|u a|a b|n d|dan|nmɛ| ta|n ɔ|etɔ|e g|o j| we|onu|wem|ba |ema|ɛ g|o h|ɛ s|ɛ t|i s|u w|n s| sɔ|bǐ | bǐ|hwe|a m|sɔ |lɔn|o d|u m|ple| ma|ɛ l|azɔ| az|tog|ye |i l|hun| jɛ|o w|ogu|o k|u g|kan|oɖo|elɔ|gbe| le| el|wu |ka |ɛ w|n w| li|sun|esu| hu| i |ɖó | ɖó|plɔ|ɖi |ɖè |ɛnn|pan|i m|yet|xo |iin|tii| ti| fi|e b|zan|i w|poɖ|ɖes|a j|ann|a g|gun| ɖi| tu|gan|ɛ m| wu|u s|ɔ y|a l| da|u n|u l|ɔnu|obo|ɔ h|vi |lee|ijɛ|ta |e a|ya |nuɖ|ɔ d|wen| tɛ| ga| ɛ | xo",
    "nhn": "aj |tla| tl| ti|ej |li |j t|i t| ma|an |a t|kaj|tij|uan|sej|eki| no|chi|ij | ua|ma | to| te|j m| ki|noj|ika| se|lis|j u|aka|laj|tle|pa |pan|j k|ka | mo|amp|ali|ech|uaj|iua|j n|man|oj |och|tek|tli|kua|ili|a k|se | pa|ano|ise|ual|mpa|tec|n t|en |len|iaj|is | ue|a m|jto|ajt|pia| am|uel|eli| ni|ya |oua|j i|ni |hi |tok|kin|noc|one|lal|ani|nek|jki|ipa|kit|oli|ati|amo|j s|kam|aua|ia |tim|mo | ku|ant|stl| ik| ke|opa|ase|nij|ama|i m|imo|ijp|ist|tl |ijk|tis|mej|itl|tik|mon|ok |lak|par|n n|ara|ra |tit|kej|jpi|a s|ojk|ki | o |alt|nop|maj|jya| ka|iti|cht|ijt|uam|a n|kiu|lat|leu|o t|ita|lau| ip|tep|kia|jka|n m|ana|lam|kij|nka|tou|epa|n s|til|i n|i u|e t| ak|s t|k t|lti|nem|lan|eyi|mat|nau|ose|emi|j a|ntl|uat|uey|jtl|nit|nti|kip|oka|onk| on|eui|i k|kat|j p|ini|toj|kem|ale|ajy|ame|ats|pal|iki|ema|uik|n k|eua|ach|e a|ijn| sa|mpo|tot|otl|oyo|mil|hiu|eka|tol|ajk|uak|ite|san|pam|atl|yek|tia|ate|ino|jua|a i|ipi|j o|tsa|oke|its|uil|o o|jne|oju|tos|kui|oui|a a|yi |kol|ote|a u|i i|n a|ken|chp|iko|as | ne|tin| me|ank|jti| ye|kon|ojt|aui|xtl|ine|tsi|kii|you|ko |ejk|o k|uas|poy|tst|ejy|nok|las| ya|yol|hti|pou|siu| in|nel|yok|mac|ak |hik|sij| si|sto|htl|jke|nko|jch|sek|mot|i a|ela|ui |kis|mel|axt| ax|ijc|nan",
    "dip": " ku|en |ic |ku | bi|bi | yi| ke|an |yic|aan|raa| ci| th|n e| ka| eb| ra|c k|c b|n a|ci |in |th |kua|ny |ka |i k|ŋ y|i l|ben|k e|ebe| ek| e |höm|nhö|öm | al|ai |kem| ye| nh|eme|m k|men|i y|t k|n k| la|c e|ith| er|lɛ̈|thi|alɛ|ua |t e|ek |ɛ̈ŋ| lo|ɔc |n t|ŋ k| ep|u l|it |yen|kɔc|̈ŋ |de |k k|pin|a l|i r|n y|epi|n b|lau|at |iny|aci|aai|u t|ken|au |ok | te|a c|ath| pi|ke | ac|e y|cin|u k|oŋ | lu| ti|a t|uat|baa|ik |tho|yit|ui |hii|u n|h k|e r|n c|te |kek| lö|l k|h e| lɛ|hin|thö|m e|ɛŋ |n r|n l| et| mi|ëk |i b|ekɔ|era|eŋ |e w|i t|el |ak |nhi|iic|a k|i e|pio| ny|ŋ e| aa|nde|u b|e k|kak|eba|ök |k a| ba| en|ye |lɛŋ| pa|iim|im |köu|e c|rot|e l| le|öŋ |ot |ioc|c t|i m|r e| kö| kɔ|eth|y k|oc |ŋ n|loo|la |iit| el| we| ey|i p|uny| ro|ut | tu|oi |e t|enh|thɛ|m b|hok|pan|k t|ëŋ | wi|yii|tha|wic|pir| li|u e|bik|u c|ën |ynh|y e|lui|eu |ir |y b|nyn|uc |n w|mit| ec|öun|any| aw|ɛt |ɛ̈ɛ| dh| ak|and|loi|wen|l e|höŋ|e e|thë|aku|̈ɛ̈|kut|am |eny|u m|i d|iek|k c| ko|tic|leu| ya|u y|tii| tö| ma|nyo|tö | ew|hök|den|t t|hëë|i n|k y|i c|cit|h t| ed|uee|bai|ɛ̈n|öt |eri|ɛ̈k|awu|rin|a p|cɛ̈|hai|kic|t a| të|tue|cii|hoŋ| bɛ|ooŋ|n p| cɛ|̈k |c l|u p|uk |c y|löi|i a|eke|dhi|wel|thk|eeŋ|öi |elo|n m|r k|ien|om |hom| wa|nho",
    "kde": "na | na| va| wa|la |nu |a k| ku|a w|ila|wa |a v|chi| mu|unu|e n|mun|van|a m|a n|ya |le |ele|sa | ch|asa|amb|ana|was|lam|mbo|ohe|ave| vi|ne |bo |aka|e v|a u|u a| n’|u v|e m|ke |anu| li|ve |vel|ake|ala|hil|ile| pa| av|ng’|a l|he |ing|ene|ela|ili|ika|vil|ngo|vak|ali| di|uku|wun|any|lan|a i|mbe|a a|uni|e a|ama| ma|go |nda|bel|emb|wak|kuw|nya| mw|ola|a d|den|lem|a c| il|ulu|kol|g’a|o v|nji|kan|ji |au |ma | au|lil|mbi|uwu|lik|ye |’an|kuk|din|ula|no |and|umi|kum|eng|ane|dya|ong|o l|ach|mwa|e w| ak|an’|a p|kal|nil|lew|mad|n’n|voh|ilo|wen|aya|apa| vy|kut|ale|va | al|ang|ava|kul|hin|o m|hel|e k|ond|hi | la|lin| lu|idy|dye|u l|da |ole|ka |ani|ndo|ton| in|ewa|lov|o c|dan|u m|cho|uva|ia |pan|kam|we |ove|nan|uko|bi |kav| ya|lim| um|eli|u n|nga|uli|lia|mil|o n|’ch| kw|li | an|aha|dil|ata| dy|e l|n’t|i v|tuk|hoh|u i|hev|ni |niw|und| ul|ade|lel|kay|lon|e u|ino|i n|nje|uwa|she|yik| ly|hum|ako|i w|uma|vya|kwa|ba |’ma|val|kil|mwe|mba|mu |pal|umb|wav|hih|ulo| ka|e c|nde|wal|ima|’ni|lun|ihu|a y|vin|yoh|e i|vyo|inj|u c|kup|kuv| ki| m’|a s|e p|dol|lek|awa|o u|n’c|iwa|imu|anj|mal|yen|u w|yac|bil|oja|o a|ha |utu|ech|i d|uka|taw|n’m|ita|awu|ina|m’m|i a|itu|hon|lu |atu|mak|iku|lya|lit|jel|evo| vo|i l|mah|hap",
    "snn": " ba|ye |bai| ye|ai |e b| ca|ai̱|ia |ji | ne| si|i̱ | go|goa|sia|i n|e c|a y|i y|̱ b| ja|se |aye|i j|a b|jë |iye|e g|re |oa |hua|yë |quë| gu|hue|e̱ |u̱i|gu̱|ne | ma|̱i |je̱|eo |e s| hu| ña|bay|o y|ñe |ja |ajë|to |aij|deo| ñe|a i|ayë|ba | ji|beo|cat| de| be|e j|i s|mai|e e|bi |a ñ| co| e |ato|uë |ña |i g|e ñ|i b| iy|cha|ë b|eba|coa|na | ts|e y|̱je|reb| i | ti|i t|ja̱|ach|ue |e i|i c|ni |oac|e t|a ë| re|je |aiy|oji|eoj|a̱j|oye| ë |ë t|cay|ija|ico|ihu| sa|i d|ere|a c| qu|ahu|iji|ca |ua | yë| to|a h|ase|ues|ë s|aca| se|uai|e d|ese|asi|caj| ai| tu|tut|utu|ë c|yeq|equ| na|cai| i̱|ti |mac|e m|ë g|ebi|a a|ani|tu |e n|yeb|eje|oya|toy|co̱|a m|̱ t|ije|sic|eso|eoy|a t| a | te|haj|cah|oas|are|i m|a s|ehu|añe| da|o b| do|i i|i r|e r|neñ|yer|huë|ë y| o |jai|a j|aje|a g|ibë|ëay|aña|aja|a o|coc|bëa|oca|sos|doi|oi |aco|eñe| jë|ë d|ë j|cas|ëca|hay|ea |̱ g|ari|tsi|yij|sai|̱ c|osi|teo|o h|co |̱re|nej|ëhu|o s|ose|jab|̱ni| me|rib|ñes|si |yaj|jëa|uaj|ë m|dar| yi|oe |e o|nes|i̱r|ma |nij|i h|oja|uëc|ama|ë i|i̱h|o̱u|̱uë|̱hu|aqu|ëco|e a|a̱ |ëja|̱ñe|o̱a|go̱| ëj|ñe̱|tia|abë|sih| bi|tsë|sëc| je| cu|̱ a|ned|cab|a d|ore|me | oi| ro|jay|tso|ë r|eye|ta |bë |ñaj|soe|̱ca|o̱c|año|o c|ire|ohu|uej|ñej|i a|ñas|ë q| ju|ban",
    "kbp": "aa | pa| se|se |na |nɛ | nɛ| yɔ| wa|yʊ | ɛy|ɛ p|ɖɛ |aɖɛ|a ɛ|a w|ɛwɛ|ɛna|yɛ |ala|ɛ ɛ|ɛ s|ɔɔ |yɔɔ|ɩ ɛ| ɛ |paa|e ɛ|e p|ɛyʊ|aɣ | pɩ| ɛw|a p|waɖ|ʊʊ |a n| ta|yɔ |yaa|yɩ |wɛn|la |taa|ʊ w| tɔ|a a|ɔ p|ɛya| kɩ| ɩ |ɩyɛ|a t|ʊ ɛ|a k|wɛɛ|tɔm|ɔm |ɛ t|wal|ʊ n| wɛ| ŋg| tɩ|ɛ n|ɛ k|kpe|ɛ ɖ|maɣ|zɩ | an|ʊ t|ɛ y| pʊ|nɩ | tʊ|ɛyɩ|ɩɣ |ɩ t| we|ɩ y|anɩ| pɔ|a s|gbɛ| pɛ| ɛs|pa |kpa|ɛɛ |wɛ | nɔ|daa|nɔɔ|ʊ y|ama|ya | kʊ|tʊ |pal|mɩy|ayɩ|ɩ p|ɩna|tɩ | ɖɩ|ʊ p|ɔ ɛ| ɛl| mb|ɔ s|ŋgb|a y|ɩma|ɖɩ |ʊ k|ɔɖɔ|ɩ n|bʊ |mbʊ| ɛk| kp|ɛja| ɛj|tʊm|jaɖ|paɣ|kɛ | ye|ɛyɛ|alɩ| na|i ɛ| ke| ya| ɖɔ|ɩ ɖ|ɔɔy|nda|ɖɔ |fɛy|ɣ ɛ|ɩ s|jɛy|yi |ɖɔɖ|ɛla|lɩ |kɩm|kɩ |aŋ |bɛy|pee| ñɩ|lab|ɩzɩ|pe |eyi|ŋ p|ɩ ɩ|ɛzɩ| fa|ɔyʊ|aʊ |ʊmɩ|ʊyʊ|ʊma|a l|sɔɔ|a ɩ|ekp|ʊ s| aj|ajɛ| ɛt|iya|wey|ɩ k|ʊ ŋ|ma |kan|ɩsɩ|laa|ɔyɔ|ɩm |li | kɛ| lɛ|and|sam| sa|ɣtʊ|ɔ k|day|ɔɔl|ɣ p|sɩ |ɔŋ |ɩfɛ|akp|pak|sɩn|pɩf|naa|ndʊ|kul| ha|aɣt|ɔ y|uli| ɖe| kɔ|eek| pe| sɔ|m n|ŋga|ee |ga |ɖʊ |maʊ|m t|e e|ɣna|ɣ s|ŋgʊ|abɩ|akɩ|a ñ|yaɣ|pɩz|eki| ɖo|maŋ| la|yee|ana|tɩŋ|ɣ t|pad|ñɩm| ca|ɛ a|a ɖ|pɩs|ina|dʊʊ|ɖe | ɖa|a m|lɛ |ked| ɛɖ|lak|aka|gʊ |asɩ|ʊ ɖ| ɛd|dʊ |nʊm| nʊ|ñɩn|ba |ɛpɩ|pʊ |ada|ɛhɛ|hal| a |le |zɩɣ|ɛɛn|ɛsɩ| le|aɣz|uu |nɖɩ|e t|ŋ n|ɛda|lɩm|e w|ɔ w|ɩ a| ɛp| nɖ|ɛkɛ|i p|ɣzɩ|alʊ|zaɣ|bɩ |ɛ l|ɩkɛ|ɔ t|e y|ɖam|aaa|pɛw",
    "tem": "yi | yi| ka|a ʌ| tə|uni|ni |wun| ɔ | aŋ| wu|ka | kə| kʌ| ʌŋ|nɛ |kə |tək| ʌm|əkə|ɔŋ |mar| ɔw|a k|ma |i k| a |wa | mʌ|i t|ri |ɔwa|thɔ| th| ma|ari|i m|a a|ʌma|aŋ | o | ba|tha|ba | kɔ|a y|ŋ k|ɔm |‐e | rʌ|lɔm|kɔ |i ɔ|kom|o w|ʌnɛ|te |mʌ | ŋa|i o|əm |hɔf|ɔf |alɔ|om |a m|ɔ b|ɔ y|aŋf|fəm|hal|kəp| mə|ŋfə|ʌth| tʌ|a t|a r|ŋ y|ŋth|ŋa | ʌt|ɔ k|e ɔ|ɛ t| ro|wan|ema| gb|ank| ye|th |yem|nko| mɔ|ʌwa| sɔ|kʌm|m a|kət|ʌmʌ|anɛ|rʌw|ɔ t|ʌme|ʌŋt|me |ʌte| bɛ|hɔ |a ɔ|ki |ʌŋ |m ʌ|m k|ar |ŋ ɔ|yɛ |əth|ɛ ʌ| ta|i a|ta | ʌk|ə k|thi|et |pet|pa |ŋɔŋ| te|ŋe |i ʌ|ra |i r|əpe| ŋɔ|ɛ k|ʌ k| yɔ| rə|kʌt|rʌ | yɛ|bɛ |e a|e t|ro |ɔ ʌ|akə|thə|ɔ m|a‐e|əpa|a w|kəl|ə b|yɔ |ə t|mɔ |bot|ŋ t|e y|əŋ |mʌs|gba|e m|m r| bo|ʌŋe| ak|ɛ a|nʌn|ləŋ|ələ|sɔŋ|ŋ b|təm|wop|ʌ a|ə y|kəs|sek|ə s|tʌt|li |ot | ko|ɛ ŋ|ŋ a|ekr| ra|ɔth|sɔt|ʌse|ath|ru |t k|ɛ m|e k|ɛth|ma‐|po | po| wo|ʌrʌ|i y|m t|m ŋ|tʌŋ|tɔŋ|e w|gbʌ|tə |nth|ʌyi|ʌlə|hən|ʌ ʌ|op |iki|ʌkə|rʌr|ʌru|ŋgb|sɔ |əyi|rʌn|gbə|ɔ a|ər |ɔkɔ| pə| ʌr|ənʌ|ləs|nka|ith|əli|ʌy |bəl|mʌy|ran|o ɔ|ɛ r|ant|f ʌ|mə |ti |f t| tɔ|əs |r k|hi |yik|ɔ ɔ|rək|kar|ʌ t|mʌt|lɔk|ayi|krʌ|pan|na |kʌr|mət|tət|tho|pi |mʌl| to|to | wa|ʌgb|thɛ|ə g|bas|eŋ |aŋk|ɔ r|thʌ|o t|ɛŋ |i‐e|kʌ |kʌs|mɔŋ|o d|kɔŋ|din|ɔ g|kəw|di |ŋ w|əma|ɛr |ʌ y|ək |ŋko",
    "toi": " ku|a k|wa | mu|a m|la |ali|ya |tu |i a|e k|a a|aku|ula|ntu|ang| al|lim|lwa|kwa|aan|mun|mwi|de |ulu|ngu|wi |imw|luk|gul|na |ele| ak|kub|ons|unt|kul|oon|se |ant|nse| oo|zyi|gwa|si | ba|ba | lw|zya|uli|ela|a b| ci| ka| zy|waa|and| an| kw|ili|uki|eel|uba|nyi|ala|kut|ide| ma|kid|isi|uny|i m|kun|cis| ya|li |i k|nga|a l|yin|kuk|ka | ul|kus|ina|laa|nte|ila|tel|mul|wab|wee|nda|izy|ede| am|led|amb|ban|we |da |ana|kwe|e a|lil| bu|o k|bwa|aka|ukw|o a|ati|uko|awo|yan|ko |uci|ilw|bil|bo |a c|wo |amu|law|mbu|i b|bul|umi|ale|abi|kak|e m|u b|akw|u o|ti |sal|kuy|ung|bel|wak| bw|o l|ga |kal|asy|e u|lan| mb|lo |usa|ika|asi|aam|a n|ule|bi |cit|bun|kup|egw|muk|igw|u k|u a|mbi|wii|kum|a z|aci|ku |yi | mi|yo |le |mas|yig|ubu|kka|i c| ab|ene|ne |no |a y| wa|abo|ndi|uta|syo|aya|aba|len|kuc|eya|o y|mal|ind|lem| lu|ukk|mo |eka|mil|mbo|ita|uka|ama|lik|u z|ndu|mu |nzy|zum|bal|abu|upe|bam|syi|u m|liz|int|ta |yak|ley|e b|nzi|lii|kab|uti|ube|uum|i n|cik|ezy|iib|iba|ani|iko|iin|ile|was| ca|zye|alw| aa|sya|uku|twa|min|tal|muc|umu| nk|du |azy|onz|lek|kon|buk|o m|yik|i z|lwe|u u|oba|kwi|imo|gan|zil|del|usu| we|peg|yee|ngw|sum|imb|ump|mpu|nde|end|i o|yoo|o n| nc|a u|mi |ano|uya|o c|di |mba|yil|yal|ako|a o|isy|izu|omb",
    "est": "sel|ja | ja|le |se |ust|ste|use|ise|õig|mis| va|gus|ele|te |igu|us |st |dus| õi| võ| on|on |e j| in|ini|nim|ma |el |a v|iga|ist|ime|al |või|da | te|lik| ig|adu|mes|ami|end|e k|e v|l o| ka|est| ra| se|õi |iku| ko|vab|aba|tus|ud |a k|ese| ku|l i|gal|tsi|lt |es |ema|ida|ks |a i|n õ|lis|atu|rah|tam|ast|sta|e t|s s| mi|ta |ole|stu|bad|ga |val|ine| ta|ne | pe|nda|ell|a t|ali|ava|ada|a p|ik |kus|e s|ioo|tes|ahe|ing|lus| ol|a a|is |vah|a s|ei | ei|kon|vas|tud|ahv|t k|as |a r|s t|e e|i v|eks|oon|t v|oni|kõi|s k|sio|sus|e a|gi |mat|min| pi|s v|oma|kul|dad| ni|e p| om|igi|tel|a j|e o|ndu|dse|lle|ees|tse|uta|vus|aal|aja|i t|dam|ats|ni |ete|pid|pea|e õ|its|lma|lev|nis|dis|ühi|sli|i s|nen|iel|des|de |t i|et |nin|eva|teg|usl|elt|ili|i m|ng | ee|tem|ses|ilm|sek|ab | põ|ait| ne|õrd|sed|võr|ul | üh| ki|abi| kõ|ega|rds| vä|ots| et| ri|põh|ed |töö|si |ad |i k| tä|ata| ab| su|eli| sa|s o|s j|sil|nni|ari|asu|nna| al|nud|uma|sik|hvu|onn|eab|emi|rid|ara|set|e m| ke|a e|täi|d k|s p|i e|imi|eis|e r|na | ül|a ü|koh|a o|aks|s e|e n| so|õik|saa|and|isi|nde|tum|hel|lii|kin|äär|sea|isk|een|ead|dum| kä|rii|rat|lem|umi|kor|sa |idu|mus|rit|har| si|vad|ita|ale|kai|teo| mõ|ade|üks|mas|lse|als|iaa|sia|sot|jal|iig|ite",
    "snk": "an | a | na|na |a n|ga | ga|en | su|re |a k| ka|su |a a|a s| ta|un | se|ta |ma | i |ama|do |e s|ere|ser|aan| do|nan|nta| ra|n s| ma| ki| ja|jam| da|taq|ne |a g|a d| ya|n d|ni | ku|ren|ri | si|ana|u k|n ŋ|ŋa | nt|e k|maa| ŋa|ndi|wa |aqu|ane| ba|ra |a r| sa|oro|n t|raa|tan| ke|oxo| xa|i s|di |a f|and|ti |a b| be|i k|gan|aax|aaw| go|iri|kit|awa|axu|sir|a i| du|a t|me |ara|ya |ini|xo |tta|i a|oll|ran|on |gol|e d|n g|a j|nde|aar|e m|be |a m|ari|u n|lli|ron| fa|qu | ti|n n|aad|axa| ña|o a| so|ke |nu | ko|din|lle|dan|a y|man|i g|sor|u r|i t| no|are|xar|kuu| wa|enm|ada|baa|de |qun|o k|yi |xun|i n|i x| an| ha|kan|fo |att|ang|n k|o s|dam|haa|da |n y|kat|e t|li | fo|i d| mo|nme|u b|i m|aba| fe|len| re|pa |ant|ayi|yan|e n|a x|e y|n b| di|ppa|app|kap|xa |u t|o g|mox|ure| xo|ond|i i|a ñ|n x|taa|du |ell| me|iti|xu |u d|udo|ind|uud|anu|nga|o b|nun|nox|n f|ku |aga|anŋ|dun|itt|eye|ye | bo|ore|ite|u a|oor| yi| ro|sar|saa|ill|e b| wu|le |riy|nma|ro |ken|edd|fed|bur| mu|mun|o n|iin|tey|sel| tu|u m|lla|la |ono|ñaa|den|faa|a w|te |inm|ka |aay| te|ina|xoo|o d|ira|u s|o t|nmu|nen|ban|ene| ni|ña |o i|uur|una|o m|xon|n w|kaf|gu |e g|a h|kil|yu |und|aqi|een| bi|bag|i j|n ñ|laa|i r|no |sig|igi|kor| o |i b|bat",
    "cjk": " ku|a k|yi |nyi| ny|la | mu|wa | ci|a c|a n| ha|we |a m|nga|ga |i k|kul|uli|sa |esw|ana|ela|a h|ung|ha |tel|swe|ze |ya |a u| ka| wa|uci| ya|ate|ci |mwe|kwa|ma |mbu|ji |kut|han|u m| ul|ang| mw|nat|ca | ca|e m|mu |uth|ali|i n|mut|thu|i m|e k|lit|hu |ina|ka |kup|na | ma|asa|aku|e n|a i|pwa|nji|wes|li | mb|e a|ifu|fuc|kan|bun|ize|ing|a y|anj|mba|uta|ita|i u| kw|muk|ite|kus|amb|lin|awa|imb|cip|lim|ong|esa|i c|nge| ak|ngu| ce| an|ili|ulu| na|naw|kuh|ama|upw|emu|lem|ila| un|a a|ula|ukw|aka|cif|ule|wo |has|kun|kha| xi|o n|tam| es|usa|ala|te |u c| ng|iku|cik|lya|wil|e c|ta |xim|wik| li|muc| ly|ikh|no |o m| in|i a|utu|e w|akw|mo |imo|mil| mi|i y|ba |ko |ngi|ufu|ku |lij|uka|iji|a w|umi|o w|tan|o y|e y|imw|ulw|uha|nal|so |o k| ye|i l|e u|umw|bu |aci|lwi|aha|ciz|mwi|kat|lon|u k|yes|ipw|ulo|aze|uni|wak|lo |ema|o c|aco| iz|kum|ika|e i|cim|isa|eny|umu|pem|yum|kwo| ik|kwe|e h|ngw|wam|cin|i h|a e|wan|ge |a x|was|le |kuk|uze|lik|gul|nin|pwe|o u|mah|ata|uma| up|sak|zan| uf|fun|go |wen|mbi|uso|ges|co |ngo|iki|hal|gik|ile|nda|kol|kal|kuz|ne | ja|oze|yoz|ikw|ipe|ces|swa|cis|man|i i|iso|ele|aso|waz|mi |upu| if|ise|umb|uvu|kil| it|i w|sok|o l|oko|nyo|una|bi |tum|iko|ene|hak|sem|a l|da |vul|nyu| ut| uk|eka",
    "ada": "mi |nɛ | nɔ| nɛ| e | he|he |nɔ | a |ɔ n|kɛ | kɛ|i k| ng|a n|i n|aa |e n|blɔ| bl|ɛ n|ɛ e|gɛ |ngɛ|e b|lɔ | ma| mi|ɛ h| ts| ko|hi |ɛ a| ɔ |ko |e h|ɛɛ |tsu| ni|ɔ k|a m|a k|i h|ma | ny|emi|a h|ami| be|be |i a|ya | si|e m|e j| ka|si |ɛ m|ɔ f| kp|nya| je|ni |oo |loo|o n| hi| fɛ|fɛɛ|a t|laa|a b|je |e k| pe|pee| ye|mɛ |umi|ɔ m| ha|a a|ɔmi|omi|kpa| wo|ɔ e|i t|ɛ ɔ|e s|i b|ɔ h| lo|ɛ k|ke |ha |bɔ |maa|mla|i m|ɔ t|ɔ́ |e p|kaa|ahi| sa|lɔh|ɔhi|sum|ɔ a|nɔ́|o e| na| gb|ee |e ɔ| ji|e a|i s| ml|ɛ s|sa | hɛ|ɔɔ |yem|u n|alo| jɔ| ku| lɛ| bɔ| to|a s|ɛ b|i l|lɛ |sua|o k|uaa|a j| su|ɛmi| ad|ɛ y|imi|ade| fa| al|jɔm|des|esa|eɔ |ihi|ji |ne |ɛ t|a e|ɛ j|ake|e e|kak|ngɔ|o a|eem|i j|e y|wo | bu|him|e w|́ k|ɔ y|tom|suɔ|ia |ane|mah| ya|o b| ke|e g|wom|gba|ue |ba | bi| gu|uo |e t|san|uu |pa |hia| tu| hu|suo| we|tsɔ|ɔ s|e f|kuu|gɔ |o m|a p| ja|ɛ p|fa |ɔ b|ɛ g|hɛɛ| ab|a l|hu |ye |na |tue|i ɔ|isi| sɔ|sɔs|jam|gu |ti |ɛ w|sis|o h|uɔ |li |a w| ba|sɔɔ|abɔ| ju| hl|ɔsɔ|hla|ɔ l|a y|sɛ | ɔm|ɔmɛ|i w|ɛti|pɛt|kpɛ|to | yi|asa| kɔ|nyu|akp|pak|kpe|sɔɛ|ɔɛ |u ɔ|yɛm|o s|uɛ | nu|pe |se | sɛ|o j|a g|ɔ w| wa|sem| pu|su |e l| mɛ|u k|hɛ |nih|kas| fɔ|kon|onɛ|bim|lam|imɛ|nyɛ| fi|hiɔ|usu|i p|bi | ní|yo |eeɔ|uam|bum|níh|íhi|o l|ula|kul|guɛ|naa",
    "bin": "e o|ne | ne|be |an |en |vbe| o |wan|mwa|n n|e e|emw|evb|mwe|in |na |e n| na| em|omw|e a|n e|e i| vb|re | ke|gha|gbe|wen| gh|ie |wee| om|e u| kh|bo |hia| ir|ha |o k|nmw|tin|n o|vbo|he |eti|ia |kev| ev| we| et|win|ke |ee |o n| hi|a n|a r|o r|gie|ran| ya|ira|mwi|a m| mw|a g|ghe|ogh| a | re| uh|eke| og|n k| no|ro |ye |khe| ye|hek|rri|nog|een|unm|a k|ogi|egb|ya |ere|wun|hun|mwu| mi|mie|de | rr|a e| ar|a o|n y|e v|o g|un |ra | ot| gb|uhu| ok|n i|ien|a v|rhi|e k|n a|i n|a y| ru|khi|n m|hie| eg|oto|arr|ba |ovb|u a|e y|ru |ian|hi |kpa| ra|o m|nde|yan|e w|and|to |o e|o h| ni| rh|e r|n g| er|n h|ugb|we |hae|on | iy|dom|rue|u e| or| ik|ren|a i|aro|iko|o y|n w|ben|ene|rio|se |i k|uem|ehe| ov|otu|okp|kug|oba|iob| uw|aen| do|iru|ae |tu |ue | iw| ma|wu |rro|o o|rie|n v| ug|a u|nna| al|ugh|agb|pa | ay|o w|ze |uwu|ma | eb|iye|aya|ugi|inn|gho|rre|nii|aku|gba|khu| se|yi |onm|ho |a w|ii |iwi| uy|uyi|e d| i |hin|obo|u o| ak|beh|ebe|uhi|bie|ai |da |i r|gbo|o v|won|mwo|umw| ag|ode| ek| la| um|aan| eh|egh|yin|anm|mo | kp| bi|kom|irr|i e|a a|kha|oda|bon|a d| ow|owa|ghi|n u|o a|yen|eem|ieg| az|aze|hoe| yi|oe |e g|ele|le |lug| ka|aa | as|yaa|gue|a h|mu |nre| od|n r|ero|ese| ku|enr|lel|vbi|wa |u i|a b|oro|bi ",
    "gaa": "mɔ | ni|ni |kɛ |ɛ a| ak|lɛ |i a| he|ɛ m|akɛ| lɛ| ko|gbɛ|ɔ n|ɛɛ | mɔ| kɛ|yɛ |li |ɛ e|ko |ɔ k|i e|aa | yɛ|bɛ | ml|shi|ɛ h|egb| gb|ɔɔ |mli| fɛ|fɛɛ|heg|nɔ |a a|i n|aŋ |oo | nɔ|i k|he |ɛ n| es| am|ɛ k|ɔ y| sh| ma|esa|loo|ji |maŋ|amɛ|emɔ|ɔ f|fee| ek| al|ɛi |ii |ɔ m|ɔ a|bɔ |e n|ɔ l|amɔ| eh|alo|hi |naa|ee |ɔmɔ|oni| en|o n|kon|aji|i y|i m|sa |o a|eli|umɔ| bɔ| hu|yel|hu |eem|nɛɛ|tsu| ah| nɛ|sum|tsɔ| an|nii|o e|baa| as|mɛi|yɔɔ|gbɔ|aaa|na |i h|eye|ɛ g|eɔ |ɛji| at|ana|eko|ena|o h|ŋ n|kom| ts|ɔ e|maj|i s|i l|efe|ome| kp|a l|kwɛ|ku |ehe|toi|a n|saa|bɔm|ha |a m|kɛj|kpa|hew| ku| sa| na|hiɛ| hi|ane|gba|e e|i f| mɛ|ɛ t|bɛi|ash|ŋ k|e k| ej|hey|aka|ats|ne |its|e a|san| ay|ye | je| kr| ey|mla|eŋm|nit|a h|ɔ b|ɛ s|anɔ|ŋmɔ|a e|ɛ b|jeŋ|ɛ y|aan|kro| ab| af|any|iaŋ|ɔ g|a k| yɔ|uɔ |shw|ets|ekɛ|usu|ŋŋ |ŋma|esh|u l| ba| et|iɔ |i j|o k|suɔ|oko| yi|e s| ag|afe|agb|oi |ŋ a|rok|o s| aw|ai | ji|ɛ j|aye|ŋ h|ish|nyɛ|la | ad|o m| ef|tsɛ|sɛ |wɔ |ewɔ|mɔɔ|ehi|aŋm|hwe| bɛ| to|ɔ h|jɛ |aha| ja|paŋ|alɛ|awo|sɔ |ŋts|ɛŋt|iɛŋ|bii|diɛ| di|mɛb|eni|his| ny|e b|hik|u k|ate|i b|ŋmɛ|akw|o y|eŋ |ahe| lo|me |ade|ɔ j|kɛn|teŋ|yeɔ|ɔ s|des| su|wal|nyɔ| eb| eg|ŋ m|mef|saŋ|ɛ l|o l|u n|asa|sem|jia|wɛ | em|o b|gbe|hil|ihi|hih|ɔŋ |nak|e h|sus|e g",
    "kng": " ya|na |ya |a k| na|a y|a m| ku|a n|a b| ba|u y|and|ka | mu|yin|wan|tu | lu|aka| mp|ve | yi|la |ntu| ki|mpe|pe |nda|a l|si |yan|ana|so | ke|e n|ons|nso|di |da |ndi|i y|u n|lu |mun|alu|unt|ina|e y|nza|luv|ala|uve| ma|u m|ke |za |ayi|sal|o m|ban|ndu|ta |isa|kan|ulu|i m|amb|ma |kim|u k|fwa| ny|nyo|yon|ama|ti |ang|anz|du |kus|o y| me|i n|to |ins|nsi|wa |usa| mo|kon|uta|end|i k|uka| bi|a d| ko|mbu|mos|sa | ve|ika|mu |osi|e k|uti|kuz|imp|a v|e m|und|ind| fw|ila| to|pwa|mpw|ngu|bal|adi|ba | sa|len|sam|sik|mab|tin|vwa|mba|kuk| di|yay|a t|yi | le|ant| ka|ata|isi|olo|kis|mut|ula|lo |bu |su | bu| at|amu|o n|dya|kut|dil| nz|ngi|abu|usu|but| nt|ni |bak|kul|e b|nga|e l|inz|imv|gu |wu | dy|lus|awu| ti|lak|bay|bun|kat|ngo|tal|i b|utu|kak|o k|bim|uzi|uza|mvu| ng|nak|iku|baw|esa|kin|ken|yak|mpa|luz|umu|nu |nta|dis|dik|vuk|u f|tan|sad|ati|nka|ank|luk|mak|ong| mb|ani|i l|lwa|aba|luy|uya|yal|ing|zwa|kuv|idi|ku |ga |zit|bis|uvw|uzw| ni|swa| nk|iti|mef|fun|ibu|nsa|aku|ufu|kub|lam|met|i a|mus|eta|a a|u t|twa|atu|tuk|fum|uko|iki|don|kol|kun|bam|eng|uku|ndo| ns|a s|ela|usi|pam|mvw|u b|i t|zo |anu|tis|uke|sul|te |gid|dib|yam|ilw| mf|ola|umb|uso|kam|gi |mbi|oko|nzi|i s| nd|mfu|luf|dus|bum|lut|mam|ded|wil|tad",
    "ndo": "na |oku|wa | na|a o|a n|ka |ntu| uu|tu |uth| om|e o|mba|ong|omu|ba | ok|uut| ne|he |the|ang|hem|emb|unt|o o|a u| wo|nge| iy|ehe|kal| no|a w|o n|no |nga|e n|ko |mun|oka|lo |o i|lon|we |ulu|a m|ala| ke|la |a k|u n|han|ku |gwa|osh|shi|ana|ngu|ilo|ano|ngo|keh| mo|ga |nen|man|ho |luk|tha|ge |gul|u k|eng|ha |a y|elo|uko|a e|ye |hil|uka|li |go |wan|ath|wo |thi|dhi|uun| pa|kwa| ta|a p|ya | sh| ko|nka|lwa| os|mwe|oma|ta |ema|sho| ka|e m| yo|sha|wok|ika|po |o w|onk|e p|pan|ith|a i|opa|gel|hik|iya|hi |aan|una|o g|kuk|alo|o e|nok|ndj|le |a a|men|yom|a s|i n| li|and| po|pam|lat|kan|ash|waa|aka|ame|gam|umb|a t|ond|yuu|o k|olo|ane|ing|igw|aa |ele|kul|mon| gw|ilw|gan|o y|iil|iyo| el|kut|nin|oko|ike|o m| ku|adh| ye|amw|ome|yeh|aye| ga| on| yi|a g|lyo|ne | ng|mbo|opo|kug|eko|yok|wom| oy|non|iye| go|ulo|e e| we| e |ina|ant|omo|ene| a |i k|mok|him| dh|und|ndu| me|eho|wen|nek| op|alu|e g|ima|kat|ota|oye|ila|ngw|yop|wat|ela|o u|a l| ii| ay| nd| th|o l|yon|ili|oon|okw|yaa|taa|lwe|omb| ni|aku|i m|mo |ula|ekw|enw|iyu|pok|epa|uki|ke | wu| mb|meh|e t|uni|nom|dho|pau|eta|yi | ly|o a|ono|lun|lak|ola|yo |lol|ank|bo |i o|awa|nwa|a h|naw|hok|nem|kom|ndo|o s|u t|vet|mbu|ani|uga|ndi|ukw|udh|lok|e k|alw|kwe|kun| ya",
    "quy": "chi|nch|hik|una| ka|anc|kun|man|ana|aq |cha|aku|pas|as |sqa|paq|nan|qa |apa|kan|ikp|ik |ech|spa| de|pa |cho|ere|der|rec|am | ru|an | ma| ch|kpa|asq|ta |na |nam|nak|taq|a k|qan|ina|run|lli|ach|nap|pi |mi | ll|yoq|asp|ima|hay|hin|aqa|nku|ant|ayn|oyo| hi| im|hoy|cio|nta|nas|q k|api|iw |wan|kuy|kay|liw|aci|ion|ipa|lla|oq |npa|ay |kas|a m|nac| na|inc|all|ama|ari|anp| ya|chu| hu|nin|pip|i k|qmi|hon|w r|ata|awa|a c|ota|in |yku|yna| wa|a h|has|a d|iku|a l| li|pan|ich|may| pi| ha|onc|a r|onk| ot|ku | qa|ank|aqm|mun|anm|hu |a p|nma| mu|qta|n h|pap|isq|yni|ikm|ma |wsa|aws|kaw|ibr|bre|lib|ayk|usp|nqa|e k| al|lin|n k|re |ara|nat|yac|kma|war|huk|uwa|yta|hwa|chw| sa|was|kus|yan|m d|kpi|q m|a i|q l|kin|tap|a a|kta|ikt|i c|a s|uy | ca|qaw|uku| tu| re|aqt|ask|qsi|sak|uch|q h|cas|tin|pak|ris|ski|sic|q d|nmi|s l|naq|tuk|mpa|a y|k c|uma|ien|ypi| am|qaq|qap|eqs|ayp|req|qpa|aqp|law|ayt|q c|pun| ni|a q|ruw|i h|haw|n c| pa|amp|par|k h| le|yma|ñun|ern|huñ|nni|n r|anq|map|aya|tar|s m|uñu|ten|val|ura|ita|arm|isu|s c|onn|igu| ri|qku|naw|k l|u l|his|ley|say|s y|rim|aru|rma|sun|ier|s o|qar|n p|a f|a t|esq|n a|oqm|s i|awk| va|w n|hap|lap|kup|i r|kam|uyk|sap| qe|ual|m p|ran|nya|gua| pe| go|gob|maq|sum|ast| su| ig",
    "rmn": "aj |en | te|te | sa| le|aka|pen| si| e |el |ipe|si |kaj|sar| th|and| o |sav|qe |les| ma|es | ha|j t|hak|ja |ar |ave| an|a s|ta |i l|ia |nas| aj|ne | so|imn|mna|sqe|esq|nd |tha|haj|e s|e t|e a|enq|asq|man| ja|kan|e m| i | ta|the|mes|cia|bar|as |isa|utn|qo |hem|o s|s s| me|vel|ark|i t| na|kas|est| ba|s h|avo| di|ard| bi| pe|rka|lo | ak|ika|e r|a a| pr|e k|qi |mat|ima|e p|a t| av|e d|r s|n s|anu|nuś|o t|avi|orr|o a| ka| re|n a|re |aja|e o|sqo|sti| ov|õl |l p|nqe|ere|d o|vor|so |no |dik|rel|ove|n t|ve |e b|res|tim|ren| de|àci|o m|i a|but|len|ali|ari|rre|de | pa|ver| va|sqi|ara|ana|vip|rak|ang|vi | ra|or |ker|i s|eme|e z|ata|e l|a e|rip|rim|akh|la |o p|kar|e h|a p|na |ane|rin|ste|j b|er |ind|ni |tne| ph|nip|r t| ke|ti |are|ndo| je|l a|uśi|e n|khi| bu|kon|lim|al |tar|ekh|jek|àlo|o k| ko|rde|rab|aba| zi|ri |aća|ćar|śik|dõl|dor|on |ano|ven| ni|śaj| śa|khe|ća |ast|j s|uti|uni|tni|naś|i d|mut| po|i p|a m| pu|a l|l s|som|n n|ikh|nik|del|ala|ris|pes|pe |j m|enć|e e|nća|ndi|rdõ|kri|erd|śka|emu|men|alo|nis|aśt|śti|amu|kh |tis|uj |j p|do |ani|ate|nda|o b|nge|o z|soc|a d|muj|o j|da |pri|rdo| as|cie|l t|ro |i r|kla|ing|a j| ze|zen|j e|ziv|hin|aśk| st|maś|ran|pal|khl|mam|i b|oci|rea|l o|nqo| vi|n e"
  },
  "Cyrillic": {
    "rus": " пр| и |рав|ств| на|пра|го |ени|ове|во | ка|ани|ть | в | по| об|ия |сво| св|лов|на | че|ело|о н| со|ост|чел|ие |ого|ет |ния|ест|аво|ый |ажд| им|ние|век| не|льн|ли |ова|име|ать|при|т п|и п|каж|или|обо| ра|ых |жды| до|дый|воб|ек |бод|ва |й ч|его|ся |и с|ии |аци|еет|но |мее|и и|лен|ой |тва|ных|то | ил|к и|енн| бы|ию | за|ми |тво|и н|о п|ван|о с|сто|аль| вс|ом |о в|ьно|их |ног|и в|нов|ако|про|ий |сти|и о|пол|олж|дол|ое |бра|я в| ос|ным|жен|раз|ти |нос|я и| во|тор|все| ег|ей |тел|не |и р|ред|ель|тве|оди| ко|общ|о и| де|има|а и|чес|ним|сно|как| ли|щес|вле|ься|нны|аст|тьс|нно|осу|е д| от|пре|шен|а с|бще|осн|одн|быт|сов|ыть|лжн|ран|нию|иче|ак |ым |ват|что|сту|чен|е в| ст|рес|оль| ни|ном|род|ля |нар|вен|ду |оже|ны |е и| то|вер|а о|зов|м и|нац|ден|рин|туп|ежд|стр| чт|я п|она|дос|х и|й и|тоя|есп|лич|бес|обр|ото|о б|ьны|ь в|нии|е м|ую | мо|ем | ме|аро| ре|ава|кот|ав | вы|ам |жно|ста|ая |под|и к|ное| к | та| го|гос|суд|еоб|я н|ен |и д|мож|еск|ели|авн|ве |ече|уще|печ|дно|о д|ход|ка | дл|для|ово|ате|льс|ю и|в к|нен|ции|ной|уда|вов| бе|оро|нст|ами|циа|кон|сем|е о|вно| эт|азо|х п|ни |жде|м п|ког|от |дст|вны|сть|ые |о о|пос|сре|тра|ейс|так|и б|дов|му |я к|нал|дру| др|кой|тер|ь п|арс|изн|соц|еди|олн",
    "ukr": "на | пр| і |пра|рав| на|ня |ння| за|ого| по|ти |го |люд| лю|во | ко| ма|льн|юди|их |о н| не|аво|анн|дин| св|сво|ожн|кож|енн|пов|жна| до|ати|ина|ає |а л| бу|аці|не |ува|обо| ос| як|має| ви|них|аль|або|є п| та|ні |ть |ови|бо | ві| аб|ере|і п|а м|вин|без|при|іль|ног|о п|ми |та |ом |ою |бод|ста|воб| бе|до |ва |ті | об|о в|ост| в | що|ий |ся |і с| сп|инн|від|ств|и п|ван|нов|нан|кон| у |ват|она|ії |но |дно|ій |езп|пер| де|ути|ьно|ист|під|сті|бут| мо|и і|ідн|ако|нні|ід |тис|що |род|і в|а з|ава| пе|му |і н|а п|соб|ої |а в|спр|ів |ний|яко|ду |вно|і д|ну |аро|и с| ін|ля |рів|у в| рі|и д|нар|нен|ова|ому|лен|нац|ним|ися|чи |ав |і р|ном| ро|нос|ві |вни|овн| її|ові|мож|віл|у п| пі| су|її |одн| вс|ово|ють|іст|сть|і з| ст|буд| ра|чен|про|роз|івн|оду|а о|ьни|ни |о с|сно|зна|рац|им |о д|ими|я і|ції|х п|дер|чин| со|а с|ерж|и з|и в|е п|ди |заб|осо|у с|е б|сі |тер|ніх|я н|і б|кла|спі|в і| ні|о з|ржа|сту|їх |а н|нна|так|я п|зпе| од|абе|для|ту |і м|печ| дл|же |ки |віт|ніс|гал|ага|е м|ами|зах|рим|ї о|тан|ког|рес|удь| ре|то |ков|тор|ара|сві|тва|а б|оже|соц|оці|ціа|осн|роб|дь‐|ь‐я|‐як|і і|заг|ахи|хис|піл|цій|х в|лив|осв|іал|руч|ь п|інш|в я|ги |аги| ді|ком|ини|а і|оди|нал|тво|кої|всі|я в|ною|об |о у|о о|і о",
    "bos": " пр| и |рав| на|пра|на |да |ма |има| св|а с|а п| да|а и| по|је |во |ко |ва | у |ако|но |о и|е с| за| им|аво|ти |ава|сва|и п|ли |о н|или|и с|их |вак| ко|ост|а у| сл|не |вањ| др|ње | не|кој|ња | би|ије|и д|им |ств|у с|јед|бод|сло|лоб|обо| ил|при| је|ање| ра|а д| об| су|е и|вје|се |ом |и и|сти| се|ју |дру|а б| ос|циј|вој|е п|а н|раз|су |у п|ања|о д|ује|а о|у и| од|и у|ло |ова|дје|жав|оје|а к|ни |ово|едн|ити|аци|у о|о п|нос|и о|бра| ка|шти|а ј|них|е о|пре|про|ржа| бу|буд|тре| тр|ог |држ|бит|е д|у з|ја |ста|авн|ија|е б|миј|и н|реб|сво|ђи |а з|ве |бил|ред|род|аро|ило|ива|ту |пос| ње| из|е у|ају|ба |ка |ем |ени|де |јер|у д|одн|њег|ду |гов|вим|јел|тва|за | до|еђу|ним| са|нар|а т| ни|о к|оји|м и| см| ст|еба|ода|ран|у н|дна|ичн|уђи|ист|вно|алн|и м| дј|нак|нац|сно|нст|тив|ани|ено|е к|е н|аве|ан |чно|и б|ном|сту|нов|ови|чов|нап|ног|м с|ој |ну |а р|еди|овј|оја|сми|осн|анс|ара|дно|х п|под|сам|обр|о о|руг|тво|ји | мо|его|тит|ашт|заш| кр|тељ|ико|уна|ник|рад|оду|туп|жив| ми|јек|кри| ов| вј| чо|ву |г п| оп|међ|њу |рив|нич|ина|одр|е т|уду| те|мје|ење|сви|а ч|у у|ниц|дни| та|и т|тно|ите|и в|дст|акв|те |ао | вр|ра |вољ|рим|ак |иту|ави|кла|вни|амо| он|ада|ере|ена|сто|кон|ст |она|иво|оби|оба|едс|как|љу ",
    "srp": " пр| и |рав|пра| на|на | по|ма | св|да |има|а п|а и|во |ко |ва |ти |и п| у |ако| да|а с|аво|и с|ост| за|о и|сва| им|вак|ава|је |е с| сл| ко|о н|ња |но |не | не|ом |ли | др|или|у с|сло|обо|кој|их |лоб|бод|им |а н|ју | ил|ств| би|сти|а о|при|а у| ра|јед|ог | је|е п|ње |ни |у п|а д|едн|ити|а к|нос|и у|о д|про| су|ање|ова|е и|вањ|и и|циј| ос|се |дру|ста|ају|ања|и о| об|род|ове| ка| де|е о|аци|ја |ово| ни| од|и д| се|ве |ује|ени|ија|авн|жав| ст|у и|м и|дна|су |ред|и н|оја|е б|ара|што|нов|ржа|вој|држ|тва|оди|у о|а б|одн|пош|ошт|ним|а ј|ка |ран|у у| ов|аро|е д|сно|ења|у з|раз| из|осн|а з|о п|аве|пре|де |бит|них|шти|ву |у д|ду |ту | тр|нар| са|гов|за |без|оји|у н|вно|ичн|еђу|ло |ан |чно|ји |нак|ода| ме|вим|то |сво|ани|нац| ње|ник|њег|тит|ој |ме |ном|м с|е у|о к|ку | до|ика|ико|е к|пос|ашт|тре|алн|ног| вр|реб|нст| кр|сту|дно|ем |вар|е н|рив|туп|жив|те |чов|ст |ови|дни|ао |сме|бра|ави| ли|као|вољ|ило|о с|штв|и м|заш|њу |руг|тав|анс|ено|пор|кри|и б|оду|а р|ла | чо|а т|руш|ушт| бу|буд|ављ|уги|м п|ком|оје|вер| ве|под|и в|међ|его|вре|акв|еди|тво| см|од |дел|ена|рад|ба | мо|ну |о ј|дст|кла| оп|как|сам|ере|рим|вич|ива|о о| он|вни|тер|збе|х п|ниц|еба|е р|у в|ист|век|рем|сви|бил|ште|езб|јућ|њен|гла",
    "uzn": "лар|ан |га |ар | ва| би|да |ва |ир | ҳу|ига|уқу|бир|ҳуқ|қуқ|ган| ҳа|ини|нг |р б|иш | та|ни |инг|лик|а э|ида|или|лиш|нин|ари|иши| ин|ади|он |инс|нсо|сон|ий |лан|дир| ма|кин|и б|ши |ҳар| бў|бўл| му|дан|уқи|ила|қла|р и|қиг|эга| эг| ўз|ки |эрк|қил|а б|оли|кла| эр|гад|лга|нли| ол|рки|и ҳ| ёк|ёки| қа|иб |иги|лиг|н б|н м| қи| ба|ара|атл|ри | бо|лат|бил|ин |ҳам|а т|лаш|р ҳ|ала| эт|инл|ик |бош|ниш|ш ҳ|мас|и в|эти|тил|тла|а ҳ|и м|а қ|уқл|қар|ани|арн|рни|им |ат |оси|ўли|ги | да|а и|н ҳ|риш|и т|мла|ли | ха|а м|ият| бу|рла|а а|рча|бар|аси|ўз |арч|ати|лин|ча |либ|мум| ас|аро|а о|ун |таъ| бе| ту|икл|р в|тга|тиб| ке|н э|ш в|мда|амд|али|н қ|мат|шга| те|сид|лла|иро| шу| қо|дам|а ш|ирл|илл|хал|рга| де|ири|тиш|умк|ола|амл|мки|тен|гин|ур |а ў|рак|а ё|имо| эъ|алқ| са|енг|тар|рда|ода| ша|шқа|ўлг|кат|сий|ак |н о|зар|и қ|ор | ми|нда|н в| си|аза|ера|а к|тни|р т|мил| ки|к б|ана|ам |ошқ|рин|сос|ас | со|сиз|асо|нид|асл|н ў|н т|илг|бу |й т|ти |син|дав|шла|на |лим|қон|и а|лак|эма|муҳ|ъти|си |бор|аш |и э|ака|нга|а в|дек|уни|екл|ино|ами| жа|риг|а д| эм|вла|лма|кер| то|лли|авл| ка|ят |н и|аъл|чун|анл|учу| уч|и с|аёт| иш|а у|тда|мия|а с|ра |ўзи|оий|ай |диг|эът|сла|ага|ник|р д|ция| ни|и ў|ада|рор|лад|сит|кда|икд|ким",
    "azj": " вә|вә |әр |лар| һә|ин |ир | ол| һү| би|һүг|үгу|гуг|на |ләр|дә |һәр| шә|бир|ан | тә|лик|р б|мал|лма|асы|ини|р һ|шәх|ән |әхс|ары|гла|дир|а м|али|угу|аг | ма|ын |илә|уна|јәт| ја|икд|ара|ар |әри|әси|рин|әти|р ш|нин|дән|јјә|н һ| аз|ни |әрә| мә|зад|мәк|ијј| мү|син|тин|үн |олу|и в|ндә|гун|рын|аза|нда|ә а|әт |ыны|нын|лыг|илм| га| ет|ә ј|кди|әк |лә |лмә|олм|ына|инд|лун| ин|мас|хс |сын|ә б|г в|н м|адл|ја |тмә|н т|әми|нә |длы|да | бә|нун|бәр|сы | он|әја|ә һ|маг|дан|ун |етм|инә|н а|рлә|си | ва|ә в|раг|н б|ә м|ама|ры |н и|әра|нма|ынд|инс| өз|аны|ала| ал|ик |ә д|ләт|ирл|ил | ди|бил|ығы|ли |а б|әлә|дил|ә е|унм|алы|мүд| сә|ны |ә и|н в|ыг |нла|үда|аси|или| дә|нса|сан|угл|уг |әтл|ә о|хси| һе|ола|кил|ејн|тәр|јин| бу|ми |мәс|дыр|һәм| да|мин|иш | һа| ки|у в|лан|әни| ас|хал|бу |лығ|р в| ед|јан|рә |һеч|алг| та|еч |и с|ы һ|сиа|оси|сос|фиә|г һ|афи|ким|даф| әс|ә г| иш|н ә|ији|ыгл|әмә|ы о|әдә|әса| со|а г|лыд|илл|мил|а һ|ыды|сас|лы |ист| ис|ифа|мәз|ыр |јар|тлә|лиј|түн|ина|ә т|сиј|ал |рил| бү|иә |бүт| үч|үтү|өз |ону| ми|ија| нә|адә|ман|үчү|чүн|сеч|ылы|т в| се|иал|дах|сил|еди|н е|әји|ахи|хил| ҹә|миј|мән|р а|әз |а в|илд|и һ|тәһ|әһс|ы в|һси|вар|шәр|абә|гу |раб|аја|з һ|амә|там|ғын|ад |уғу|н д|мәһ|тәм| ни|и т| ха",
    "koi": "ны |ӧн | бы|да | пр|пра|рав| мо|лӧн| да|быд|лӧ |орт|мор|ӧм |аво|ӧй | ве|ыд | не|нӧй|ыс |ын |сӧ |тӧм|сь |во |эз |льн|ьнӧ|тны|д м| ас|ыны|м п| по|сьӧ| и |то |бы | ӧт| эм| кы|аль|тлӧ|н э| от|вер|эм | кӧ|ртл|ӧ в| ко|воэ|ств|ерм|тшӧ| до|ола|ылӧ|вол|ас |ӧдн|кыт|ісь|ето|нет|тво|ліс|кӧр|ӧс | се|ы с|шӧм|а с|та |злӧ| ме| ол|аци|ӧ к|ӧ д|мед| вы|вны|а в|на |з в| на|ӧ б|лас|ӧрт| во| вӧ| сі|лан|рмӧ|дбы|едб|ыдӧ|оз |ась| оз| сы|ытш|олӧ|оэз|тир|с о| чу|ы а|оти|ция|ись|ӧтл| эт|рты| го|ы п|ы б|кол|тыс|сет| сь|рті|кӧт|о с|н б|дз |н н| мы| ке|кер|тӧн|тӧг|ӧтн|ис |а д|мӧ |ост|ӧ м| со|онд|нац|дӧс|итӧ|ест|выл| ви|сис|эта| уд|суд|нӧ |удж|ӧг |пон|ы н|н п|мӧд|а п|орй|ӧны|ӧмӧ|н м|ть |сыл|ана|ті |нда|рны|сси|рре|укӧ|з к|чук|йын|рез| эз|ысл|ӧр |ьӧр|с с|с д|рт |с в|езл|кин|осу|эзл|й о|отс| тӧ|ы д| ло| об|овн|лӧт|асс|кӧд|с м|ӧ о|нал|быт|она|ӧт |слӧ|скӧ|кон|тӧд|ытӧ|дны|а м|ы м|нек|ы к|ӧ н|асл|дор|ӧ п| де| за|а о| ов|сть|тра| дз|ь к|ӧтч|н к| ст|аса|етӧ|ьны|мӧл|умӧ|сьн| ум|ерн|код| пы|тла|оль|иал|а к|н о| сэ|а н|ь м|кыд|циа|са | ли|а б|езӧ|й д| чт|ськ|эсӧ|ион|еск|ӧ с|оци|что|ан |соц|йӧ |мӧс|тко|зын|нӧя|вес|енн| мӧ|ӧтк|ӧсь|тӧ |рлӧ|ӧя |оля|рйӧ|ӧмы|гос|тсӧ|зак|рст|з д|дек|ннё|уда|пыр|еки|ако|озь| а |исӧ|поз|дар|арс|ы ч",
    "bel": " і | пр|пра|ава| на|на | па|рав|ны |ць |або| аб|ва |ацы|аве|ае | ча|ння|анн|льн| ма| св|сва|ала|не |чал|лав|ня |ай |ых | як|га |век|е п| ад|а н| не|пры|ага| ко|а п| за|кож|ожн|ы ч|бод|дна|жны|ваб|цца|ца | ў |а а|ек |мае|і п|нне|ных|асц|а с|пав|бо |ам |ста| са| вы|ван|ьна| да|ара|дзе|одн|го |наг|він|аць|оўн|цыя|мі |то | ра|і а|тва| ас|ств|лен|аві|ад |і с|енн|і н|аль|най|аво|рац|аро|ці |сці|пад|ама| бы| яг|яго|к м|іх |рым|ым |энн|што|і і|род| та|нан| дз|ні |я а|гэт|нас|ана| гэ|інн|а б|ыць|да |ыі |оў |чын| шт|а ў|цыі|які|дзя|а і|агу|я п|ным|нац| у | ўс|ыя |ьны|оль|нар|ўна|х п|і д|ў і| гр|амі|ымі|ах | ус|адз| ні|эта|ля |воў|ыма|рад|ы п|зна|чэн|нен|аба| ка|ўле|іна|быц|ход| ін|о п| ст|ера|уль|аў |асн|сам|рам|ры | су|нал|ду |ь с|чы |кла|аны|жна|і р|пер|і з|ь у|маю|ако|ыцц|яко|для|ую |гра|ука|е і|нае|адс|і ў|кац|ўны|а з| дл|яўл|а р|аюч|ючы|оду| пе| ро|ы і|вы |і м|аса|е м|аду|х н|ода|адн|нні|кі | шл|але|раз|ада|х і|авя|нав|алі|раб|ы ў|нна|мад|роў|кан|зе |дст|жыц|ані|нст|зяр|ржа|зак|дзі|люб|аюц|бар|ім |ены|бес|тан|м п|дук|е а|гул|я ў| дэ|ве |жав|ацц|ахо|заб|а в|авы|ган|о н|ваг|я і|чна|я я|сац|так|од |ярж|соб|м н|се |чац|ніч|ыял|яль|цця|ь п|о с|вол|дэк| бе|ну |ога| рэ|рас|буд|а т|асо|сно|ейн",
    "bul": " на|на | пр|то | и |рав|да |пра| да|а с|ств|ва |та |а п|ите|но |во |ени|а н|е н| за|о и|ото|ван|не | вс|те |ки | не|о н|ове| по|а и|ава|чов|ни |ане|ия | чо|аво|ие | св|е п|а д| об|век|ест|сво| им|има|ост|и д|и ч|ани|или|все|ли |тво|и с|ние|вот|а в|ват|ма | ра|и п|и н| в |ек |сек|еки|а о| ил|е и|при| се|ова|ето|ата|воб|обо|бод|аци|ат |пре|оди|к и| бъ| съ|раз| ос|ред| ка|а б|о д|се | ко|бъд|лно|ния|о п| от|ъде|о в|за |ята| е | тр|и и|о с|тел|и в|нит|е с|ран| де|от |общ|де |ка |бра|ен |ява|ция|про|алн|и о|ият|ст |нов| до|его|как|ато| из|нег|а т|ден|а к|щес|а р|тря|а ч|ряб|о о|вен|ябв|бва|дър|гов|нац|ено|тве|ърж|е д|нос|ржа|а з|вит|зи |акв|лен| та|ежд|и з|род|е о|обр|нот| ни| с |т с|нар|о т|она|ез |йст|кат|иче| бе|жав|е т|е в|тва|зак|аро|кой|осн| ли|ува|авн|ейс|сно|рес|пол|нен|вни|без|ри |стр| ст|сто|под|чки|вид|ган|си |ди |и к|нст| те|а е|вси|еоб| дъ|сич|ичк|едв|жен|ник|ода|т н|о р|ака|ели|одн|елн|лич| че|чес|бще| ре|и м| ср|сре|и р|са |лни| си|дви|ичн|жда| къ|оет|ира|я н|дей| ме|еди|дру|ход|еме|кри|че |дос|ста|гра| то|ой |тъп|въз|ико|и у|нет| со|ави|той|елс|меж|чит|ита|що |ъм |азо|зов|нич|нал|дно| мо|ине|а у|тно|таз|кон|лит|ан |клю|люч|пос|тви|а м|й н|т и|изв|рез|ази|ра |оят|нео|чре",
    "kaz": "ен |не | құ|тар|ұқы| ба| қа|ға |ада|дам|құқ|ық | бо| ад|ықт|қта|ына|ар | жә|ың |ылы|әне|жән| не|мен|лық|на |р а|де | жа|ін |а қ|ары|ан | әр|қыл|ара|ала| ме|н қ|еме|уға|ның| де|асы|ам |іне|тан|лы |нды|да |әр |ығы|ста|еке| өз|ын |ған|анд|мес| бі| қо|ды |ің |бас|бол|етт|ып |н б|ілі|қық|нде|ері|е қ|алы|нем|се |бір|лар|есе|ы б|тын|а ж| ке|тиі|ост|ге |бар| ти|е б| ар|дық|сы |інд|е а|аты| та| бе|ы т|ік |олы|нда|ғын|ры |иіс|ғы | те|бос|луы|алу|сын|рын|еті|іс |рде|қығ|е ж|рін|дар|іні|н ж|тті|қар|н к|ім | ер|егі|ыры|ыны| са|рға|ген|ынд|аны|уын|ы м|лға|ана|нің|тер|уы |ей |тік|ке |сқа|қа |мыс|тық|м б|ард| от|е н|е т|мны|өзі|нан|гіз|еге| на|ы ә|аза|ң қ|лан|нег|асқ|кін|амн|кет|рал|айд|луғ|аса|ті |рды|і б|а б|ру | же|р м|ді |тта|мет|лік|тыр|ама|жас|н н|лып| мү|дай|өз |ігі| ал|ауд|дей|зін|бер|р б|уда|кел|біл|і т|қор|тең|лге| жү|ден|ы а|елі|дер|ы ж|а т|рқы|рлы|арқ| тү|қам|еле|а о|е ө|тін|ір |ең |уге|е м|лде|ау |ауы|ркі|н а|ы е|оны|н т|рыл|түр|ция|гін| то| ха|жағ|оға|осы|зде| ос|ікт|кті|а д|ұлт|лтт|тты|лім|ғда| ау| да|хал|тте|лма| ұл|амд|құр|ірі|қат|тал|орғ|зі |елг|сіз|ағы| ел|ң б|ыс | ас|імд|оты| әл|н е|ағд|қты|шін|ерк|е д|ек |ені|кім|ылм|шіл|аға|сты|лер|гі |атт|кен| кө|ым‐| кұ|кұқ|ра |рік|н ә| еш",
    "tat": " һә|лар|әм |һәм| ке| хо|кук|оку|хок|еше| бе|ләр|кеш|га |әр |рга|ан |кла| бу|ар |ең |нең|гә | то| ба|да |ргә| ти|ырг|һәр|ене|бер|ән |ен |р к|бул|укл|дә |а т|ары|тор|ире| үз|на |ган|ара| ка| ал|ә т|нә | ит| дә|ы б| ир|рын|ше |ын |енә|тие|лык|екл|ына|н т|иеш|бар|еле|ка |елә|а х|н б|кы |рек|ала|кар| та|ә к|нда|еш |лән|бел|укы|лан|ите|тә |шен|ле |лы |ез |ерг|н и|ә б|а к|клә|үз |тел|лыр|не |әрг|ы һ|е б| га| ха|алы|рне|м и|тен|әрн|а б|ның|ынд|ың |ләт|дан|сә | як|лга|улы|ел |а а| яи|яис|асы|ш т|а һ| са|рлә|лек|иге|ә х|гез|орм|ем |аны|р б|м а|р һ|рмы|мыш|сын|шка|ә һ|исә|тәр|үлә|әт |мәт|сен|сез|чен| ни|ә и|н м|илл|ять|ны |ылы|үзе| ки| эш| ту|алу|акы|ып |уга|ль |тан|н к|лу |бу |мас|рен|кә | тү| тә|түг|зен| җә|тын|ди |баш|кле|гән|ть | би|әре|штә|гын|әүл|ер |мил| ми|клы|гел|ыш |лер|ерл|әве|рдә|а я|р а| мә| рә|лем|хал| ан|ң т| аш|ык |ция|е х|стә|ә д|аль|рак|ек | де|рәв|тот|кән|улг|орг|веш|ешт|ни |итә|кка|м т|үге|шел|а и|ндә| да|рел|кер| кы|ерә|та |н я|еге|ый |а д|аци|р о|шла|тлә|әтл|н д|айл|ллә|ард|рда|кта|шкә| за|ге |ләш|ш б|әсе|кон|шыр|циа|нин|лау|уры|ры |оты|әне| тө|инд|нди| җи|оци|соц|лә |арт|якл|зак|тиг|рке| ди| со|ыкл|кем| ко|р и|ң б|әте|гыя|чар|үгә|ин |иле| сә| ил|мгы| ае|н а|аер|ыны|л һ",
    "tuk": " би|лар| ве|ве |да |ада|ары| хе|ир | ад|бир|дам|кла|ер |р б|ың | ха|ара|га |ен |лан|ыны|или|дыр|ам |ала| бо|хер|р а|ыр |лы |лер|ан |бил|иң |ыды|р х|акл|нда| өз|клы|ны |хук|ери| ху|уку|ага|не |лыд|ине|ына|лен|на |хак|де |‐да|ин |рын|атл| эд|маг|өз | де|асы|лыг|кук|е а|ынд|алы|лма|бол|дан|ини|а х| я‐|е х|ге |иле|я‐д|ар |ама|ли |ыгы|ети| ба| га|гын|ере|укл|лиг|ның|зат|лык|тлы|нде|ни |лик|ден|мак|сын|дил|ры |аны|кин|әге|п б|а г|хем|иги|эрк|аза|а д|мек| эр|мал|ыкл|мәг|сас| эс|екл| ма|рин|эса|ола|ы б|айы|н э|эди| гө| хи|сы | аз|баш|ы д|йда|шга|ашг|а в| до|ыет|ы в|дак|ниң|рки|гал|чин|гда|ак | җе|а б| эт|этм|кы |лет|йән| та|гин|ян |тме|хич|ич |мез| гу|хал|ылы|үнд|илм|дай|ягд| яг|и в|им |акы|ы г|ән |а а|рың|ги |тле|н м| го|ип |ал |еси| се|лме| ка|м х|дең|ң х|е д|дир|илл|рил| ал|кан|е г|лин|ра |дол| бе| ми|мил|ң д|н х|ели|н а|е м| ге|ы х| дө|ик | со|ң а|чил|дөв|е б| са|гар|е в|ең |н б|рма| ме|кли|үчи| дә| үч|ция|н в| дү|и б|айд|кле|сер|а я|соц|гор|оци|дал|мы |олм|циа|уң | он|уп |кда|дәл|ири| ди|еле|лип|алк|лим|гур|үни|нме| әх|н г| иш|ы ө|ң э|нун|еги|тин|ы а|рле|аци|ыз |з х|сыз|аха|м э|олы|рам| ту| ни|ып |ерт|алм|ора|и х|хли|әхл|к э|өвл|вле|тмә|ет |нли|ахс|гөз|гы |етл|ы ү|нуң|ону|сиз|емм|ек ",
    "tgk": "ар | ба| ҳа| да|ад | ва|он |ва | та|дар|ти | ин|ба | бо| ки|аро| до|ои |дор|ард|ки |бар|д ҳ|уқу| як|ин |ҳар|и о| на| ма|и м|ора| ҳу|як |ни |нсо|инс|и ҳ|аи |и б|сон|рад| му|ҳои|р я|ҳуқ|қуқ|ҳақ|ии |к и| ша|и д| аз|и и| оз|нд |яд |қ д|озо|аз |зод|анд|д б|ояд| ка|ият|она|да |амо|ақ |а б|ди | ё |гар|ат |дан|ҳам|оди|рда|моя| он|уда|қи | ху|бо |и т|дон|ст |нам|н ҳ|ода|и с|ан |н б|мил|и х|бош|они|оша|худ|ава|боя|аст|и а|ро | ме|а ҳ|имо|ила|оми|оба|ида|кар|н д|лат|д в|а ш|ҳо | ас|таҳ|рои|и н|д к|яти| ди|шад|ӣ в|ри |рдо|шав| ми|е к|роб|тар|та |кор| бе|о д|вад|мон|иҳо|ли |уд |оси|ошт|ми |р м|ати|т б| со|ӣ ё|нҳо|мин|шар|ара|таъ|ани|а в|иро|а д|дав|ят |даа| са|ама|дош|раф|шуд|лӣ |д а|оти|а м| фа|ист|ор |р ҳ|на |и к|р к|д т|и ҷ|и ш| эъ| су|н м|н в|и ӯ|фи |вар|диҳ|ига|зар| шу|ари|а т| иҷ| ақ| ҳи|асо|р б|т ҳ|а а|одо|мум|р в|а о| ӯ |рон|наз|диг| ни|бот| ҷа|авр| қа|яи |р д|уқи|лал|кас|шта|уна|еҷ |ино|тҳо|уни|або|сти| во|авл|и қ|вла|ун |у о|ӣ б| ҳе|дӣ |қу |чун|н и|сар|ояи|тав|маҳ|онҳ|қар|атҳ|тир|оҳ |ахс| қо|уқ |оли| ис|д д|и з| ко|аза|ори|фар|сос|ран|н к|р а|ҷти|ону|сӣ |ири|рра|рӣ |ҳеҷ| за|ид |ҳти|рии|ами|қон|уди|н н| од|иҷт|мия|ъло|лом|ию |наи|али|нда|оӣ |оят|янд| зи|оян|ӣ ҳ|и п|офи|киш|ҳим|рат|тим",
    "kir": " жа|на |ана|жан| би|уу |уку|га |бир| ук|ар |ен |луу|тар|кук|укт| ка| ад|ын |ада|ууг|дам| ме|уга|ык | ар|ене|мен|нен|ан |ары|олу| бо|ин |ам |ган|ир |бол| ал|ара|нда|н к|туу|р б|н ж| ба|анд| же|р а|кта|ына|ард|кту|эрк|үн |да |н б|н э| эр|нди|а т| ко|рды|н а|дык|рки|инд|а ж|кин|ала|а а|лар|аны|үү | өз|а к|тер|алу| та|а у|алы|а э|же |ук |ийи| ти|иш |тий| ма|гө |кыл|йиш|улу|нын|ке |н т|кар|бар|или|у м| кы|иги|рын|а б|үгө|рга|е а|ун |етт|дик| ту|дар|тта|баш|у а|н у| ээ|дын|им |рүү|гин|лык|ушу|нды|тур| са| эл| эм| мү|гон|лга|алд|икт|үүг| бе|ры |өз |нан|он | ан|кте|ул |дай|ерд|диг|р м|ери|үчү| не|атт|лды|еке|еги|үнө|лук|амд|у б|ынд|үнү|рди|тук|ка |кан|к ж| ки|м а|күн|не |ине|мда|рин|ого|кет| со|кам|дин|к м| эч| то|сыз|ылу|өзү| де|н м|ция|ээ |чүн|гиз|уп |нег|эч |руу|ыз |мес|эме| иш|лут|ы м|шка|ыкт|мам|ашк|лде| ке|лго| тү|ө ж|олг|ес |к т|кор|ге |бил|түү|угу|рал|алг|тын|кен| ул|лим|утт|ыгы|орг|н н|у ж|рде|нуу|тал|ч к|рго|мак| те| уш|уну|ктө|ди |акт|нүн| ди|зүн|иле| кө|кат|аци|мсы| эс|тык|е к|ей |тан|е э|ай |ер |соц|оци|циа|аты| жо|к к|амс|лан|а м|ири|ске|айд|ирд| мы|ылы|зги|ыны|ага|ген|е б|шул|тол|өнү|дыг|е ж|ү ү|з к|айы|раб|енд|абы|жал|ү ж|оо |уна|к а|кал|лек|ект|рма|дей| үч|тоо|мат|у э|бер",
    "mkd": " на|на | пр| и |во | се|то |ите|те |рав|та |а с|пра|ува|да | да| не|ва |а п|а н|и с|ата|о н|еко|а и| по|но |ој |кој| со| за| во|ств|ја |ње |ање|аво|ни | им|от |е п|е н|ма |ат |вањ|ост|а д|о с|е и|се |ова|ија|и п| сл|а о|има|сек|сло|ото|ли |о д|ава|обо|о и| ил|или| би|бод|и н|лоб| од|бид|ред|ен |при|вот|иде|а в|ста| об|и и|и д|пре|нос|ст |е с| ни| ќе|ове|аат|аци|ќе |со |ови|про|ј и|тво| ра|ест|што| де|т и|акв| ко|раз|гов|его|нег|ани|едн|ако|циј|бра|од |а з|е б|и о|а б|о п|ват| е | др|ето|ваа|как|ди |т с| ка| чо|ени|алн|одн|ено| си|чов| шт|а г|а е|вен|нит| ја|де |оди|е о|ран|и з|сно|нот| ед|тит|лно|ви |јат|ден|т н|нац| оп| до| ос|и в|осн|кон|дна|е д| ст|век|о о|род|сто|сит|еме|ара|дно|обр|ј н|пшт|еди|опш|за |ние|аро|нов|а к|вни|дру| ов|тве|жив|ште|д н|ие | ме|ед |иот|и м|о в|ќи |дат|шти|јќи|без|бед|ки |ков|ко |а р|нар|чно|дни| вр|ели|нак|ашт|ичн|ка |ема|цел|зем|еду|чув|тес|држ|ник|т п|луч|аа |деј|нст|не |а ч|руг|ода|ивн| це|нив|дин|авн| зе|нио|пор|а м|заш|лас|вит|дек|го |ине|ело|нет|ез |тен| ре| из|под|раб|або|бот|дув|нув| бе|ење|еде|он |њет|зов|иту|ван|н и|аѓа|е в|еѓу|рем|дел|о к|кот|им | жи|дос|вре|меѓ|олн|нап| го|емј|кри|уна|нем|оја| су|ита|азо|лит|тор|инс|ора|огл|ипа|пот|слу|кви",
    "khk": " эр|эрх| хү|ний|н б|эн |тэй|ийг|х э|эй | бо|хүн| бү|йн |ан |ах | ба|ийн|бол|ий | ха|бай|уул|рх |оло|й х|йг |гаа|эх |бүр|гүй|үн | бу|он |аар|рхт|үнд|хтэ|үр |лэх|ар | за|н х|лах|эр | хэ|й б|өлө|н э|лөө|эл | үн|аа | ул|ын |хий|үй | ор| ту|улс|ула|үлэ| чө|чөл|н т|үүл| ху|сэн| ни|ндэ|лон|гээ|р х|өөр|сан| нэ|ны | ёс|нь |эд | гэ| нь| ч | тө| тэ|лаг|оро|дэс|лс |г х|ох |үни|ээр|хам|х ё| ша|д х|р э|лго|лд | дэ|н а|бую|уюу|гуу|төр|ай |юу |тай|ээ |ж б|эг |лий|хан|ыг | эд| то|х б|дсэ|й э|рга| ал|хар|арг|ад |лга|рэг| зо|айг|ага| тү|л х|ал | хө|өөт| са|н н|йгэ|дэл|нд |гий|н з|ол |ава|лла| өө|рол|өтэ|гэр|г б|л б|бус|нэг|н д|аг |аал|н ү|алд|рла| үз|гэм|й а|н у| ол|хуу|х ч|эрэ|мга|олг|эс |хүү|той| ар|үү |лал| эн| мө|йх |ин |өрө|х т|луу|рий|сон| га|хэн|айх|эни| ам|гла|өр |аса|ана|амг| би|ард| ял|йгм|ой |лын|үрэ|эгт| ав|эдэ|оо |мий|х н|аан|үйл|арл|нха|тгэ|дээ|с о|рхи|лов|д н|тэг|өг |өн |хэр|лэн|өөг|үүн|вср|га |р т| хи|хүр|рон|ч б| хо|гөө| мэ|бие|н г|ура|бүх|ори|али| аж| үй| яв|өх |хээ|г н|ата| та|гш |г ү|эгш|вах|лох|эгд|длэ|х ү|гох|үх |энэ|лж |олц| шү|л т| да|дал|эж |д б|лан|й т|айл|л н|х а|агл|тоо| со|өри|йгу|гми|дил|ээн|дар|н ш|шүү|овс| ад|а х|р ч|ади|ааг|лаа|айд|амь|гтэ|н с|д т|ийт|лэл|х ш|н ч|унх"
  },
  "Arabic": {
    "arb": " ال|ية | في|الح|في | وا|وال| أو|ة ا|أو |الم|الت|لحق|حق |لى |كل |ان |ة و|الأ| لك|لكل|ن ا|ها |ق ف|ات |مة |ون |أن |ما |اء |ته |و ا|الع|ي ا|شخص|ي أ| أن|الإ|م ا|حري| عل|ة ل|من |الا|حقو|على|قوق|ت ا|أي |رد | شخ| لل| أي|ق ا|لا |فرد|رية| ول| من|د ا| كا| إل|خص |وق |ا ا|ة أ|ا ي|ل ف|ه ا|نسا|جتم|ن ي|امة|كان|دة | حق|ام |الق|ة م| فر|اية|سان|ل ش|ين |ن ت|إنس|ا ل| لا|ذا |هذا|ن أ|لة |ي ح| دو|ه ل|لك |ترا|لتع|اً |له |إلى| عن|ى ا|ه و|ع ا|ماع|د أ|اسي| حر|ة ع|مع |الد|نون| با|لحر|لعا|ن و|، و|يات|ي ت|الج| هذ|ير |بال|دول|لإن|عية|الف|ص ا| وي|الو|لأس| إن|أسا|ساس|ماي|حما|رام|سية|انو|مل |ي و|عام|ا و|تما| مت|ة ت|علي|ع ب|ك ا| له|ة ف|قان|ى أ|ول |هم |الب|ة ب|ساو|لقا|الر|لجم|ا ك|تمت|ليه|لتم|لمت|انت| قد|اد |ه أ| يج|ريا|ق و|ل ا|ا ب|ال |يه |اعي|لدو|ل و|لإع|لمي|لمج|لأم|تع |دم |تسا|عمل|اته|لاد|رة |اة |غير|قدم|وز |جوز|يجو|عال|لان|متع|مان|فيه|اجت|م و|يد |تعل|ن ل|ر ا| يع| كل|مم |مجت|تمع|دون| مع|تمي|ذلك|كرا|يها| مس|ميع|إعل|علا| تم| عا|ملا|اعا|لاج|ني |ليم|متس|ييز|يم |اعت|الش| تع|ميي|عن |تنا| بح|لما|ي ي|يز |ود |أمم|لات|أسر|شتر|تي | جم|ه ع|ر و|ي إ|تحد|حدة| أس|عة |ي م|ة، |معي|ن م|لمس|م ب|اق |جمي|لي |مية|الض|الس|لضم|ضما|لفر| وس|لحم|امل|ق م|را |ا ح|نت | تن|يته| أم|إلي|واج|د و|لتي| مر|مرا|متح| ذل| وأ| تح|ا ف| به| وم| بم|وية|ولي|لزو",
    "urd": "ور | او|اور| کی|کے | کے|یں | کا|کی | حق|ے ک|ایٔ|کا |یٔے| کو|یا |نے |سے | اس|ٔے |میں|کو | ہے| می|ے ا| ان|وں | کر| ہو|اس |ی ا|ر ا|شخص| شخ|حق | سے| جا|خص |ہر |ام |ے م|ں ک|ہیں| یا|سی |ادی|آزا| آز|زاد|ص ک|ہ ا|ہے |جای|ا ح|ر ش|ت ک|کہ |م ک| پر|ی ک|ان |پر |۔ہر|دی |یٔی|س ک|ا ج|ر م|ہے۔|ق ہ|ں ا|ی ح|و ا|ار |ن ک|قوق|کسی|حقو|ری |وق |ے گ| ہی|ی ج| مع|سان| نہ| مل| حا|ٔی | جو|نی |کرن| لی|تی |ی ت|نسا|ل ک| کہ|جو |انس|اپن|ے ب|نہ | اپ|یت |ا ا|ہ ک| کس|ر ک|رے |ے ہ| ای|می |ل ہ|۔ ا|ے ل|ی ش|رنے|وہ |حاص|ی م|معا|اصل|صل |یں۔|ویٔ|نہی|ملک|ایس|انہ|ات |ی ب|د ک|ی ہ| تع|کیا|ق ک|ر ہ|ا م|دہ | من| بن| قو|ے ج|یہ |ں م|اشر|مل | دو|عاش|قوم|ر ب|انی|وام|قوا|اقو|لیٔ|دار| وہ| و | عا|ی س|بر |علا|اد |ہ م|و ت|ر ن| جس|ے۔ہ|ے، |انو| دی|گی |لیم|یوں| قا| یہ|دوس|ے۔ |ا ہ|تعل|یم |ر پ|جس |ریق|ے ح| اق|نیا|لک | گی|ین |یاد| مس|لاق|، ا|ی ن|پنے|وری|م ا| با|علی|یر |ی، |انے|ون |ن ا|ر ع| بر|ی آ|ر ح| رک|ے پ|کر |گا۔| پی|سب | گا|نا | پو|یسے|رای| مر|اری|قان|نون| مم|ندگ| اع|دگی|ہ و| ہر|ر س| چا|خلا|ا پ|ق ح| بھ|س م| شا|ہوگ|ے خ|وسر|رتی|ومی| بی|رکھ| مت|کوی|ر آ|پور|اف | مح|ے س|ہوں|نکہ|ونک|ت ا| طر|ے ع|یٔد|د ا|ال |ں۔ |م م|اں | مق|غیر|پنی| ام|ں، |من |ہو |ریع|و ک|ذری| ذر|عام|، م|دان|ادا|اعل|مام|تما| عل|دیو|بھی|ھی |بنی|ے ی|ا ک|اوی|ل م| زن|یاس|لان|عمل| عم|ت م| بچ",
    "skr": "تے |اں | تے|دے |دی |وں | دا| حق| کو|ے ا|کوں| دے|دا | دی|یاں| کی|ے ۔|یں |ہر | ۔ |کیت|ہے | وچ| ہے|وچ | ان| شخ|شخص|ادی|ال | حا|اصل|حق |حاص|ے م|خص |صل |ں د| نا|یا | ای|اتے|ق ح|ل ہ|ے و|ں ک| ات|ہیں|سی | مل|نال|زاد|ازا|ی ت| از|قوق|ار |ا ح|حقو| او|ص ک| ۔ہ|۔ہر|ر ش|دیا|ے ج|وق |ندے| کر|یند| یا|نہ | جو|کہی|ئے |ی د|سان|نسا|وند|ی ا|یتے|انس|ا ا|ملک|ے ح|و ڄ|ے ک|ڻ د| وی|یسی|ے ب|ا و| ہو|ں ا|ئی |ندی|تی |آپڻ|وڻ |ر ک|ن ۔| نہ|انہ|جو | کن| آپ| جی|اون|ویس|ی ن| تھ| کہ|ان |ری |ڻے | ڄئ| ہر|ے ن|دہ |ام |ں م|ے ہ|تھی|ں و|۔ ا|ں ت|ی ۔|کنو|ی ح|ی ک|نوں|رے |ہاں| بچ|ون |ے ت|کو | من|ی ہ|اری|ور |نہا|ہکو|یتا|نی |یاد|ت د|ن د| ون|وام|ی م|قوا|تا |ڄئے|پڻے| ہک|می | قو|ق ت|ے د|لے |اف |ل ک|ل ت| تع|چ ا|ین |خلا|اے |علا| سا|جیا|ئو |کرڻ|ی و|انی|ہو |دار| و |ی ج| اق|ن ا|یت |ارے|ے س|لک |ق د|ہوو| ڋو|ر ت| اے|ے خ| چا| خل|لاف|قنو|نون|پور|ڻ ک| پو|ایہ|بچئ|چئو|ات |الا|ونڄ|وری|این| وس| لو|و ا|ہ د| رک|یب |سیب|وسی|یر |ا ک|قوم|ریا|ں آ| جا|رکھ|مل |کاں|رڻ |اد |او |عزت| قن|ب د|وئی|ے ع| عز| ۔ک| مع|اقو|ایں|م م|زت |ڻی |یوڻ|ر ہ| سم|ں س|لوک| جھ| سی|جھی|ت ت|ل ا|اوڻ|کوئ|ں ج|ہی |حدہ|تعل|ے ذ|وے |تحد|متح|لا |ا ت|کار| اع|ے ر| مت|ر ا|ا م|ھین|ھیو|یہو| مط| سڱ|ی س|ڄے |نڄے|سڱد|لیم|علی|ے ق| ذر|م ت| کھ|ن ک| کم|ہ ا|سار|ائد|ائی|د ا| ہن|ہن |ی، |و ک|ں ب|ھیا|ذری|ں پ|لی ",
    "uig": " ئا| ھە|ىنى|ە ئ|نىڭ|ىلى| ۋە|ىڭ |ۋە | ئى| بو|ھوق|وقۇ| ھو|قۇق|نى |بول| ئە|لىك|قىل|ىن |لىش|شقا|قا |ەن | قى|ن ب|ھەم|ى ئ|ئاد|ىشى|دەم|ادە|كى |لىق|غان|ىي |ىغا|گە | بى|دىن|ىدى|ەت |كىن|ىكى|ندا|ۇق | تە|نلى|تىن|ەم |لەت|قان|ىگە|ىتى|ىش |ھەر|ئەر| با|ولۇ|دۆل|غا |اند| دۆ|اق |مە |لۇش|دە |لۇق| ئۆ|ان | يا|ەرق|ۆلە|ركى| قا|ەرك|ەمم|ا ئ|ممە|ۇقى|ىق | بە|رقا|داق|ارا|ىلە|رىم|ىشق|ى ۋ|لغا|مەن|اكى|ەر |ا ھ|دۇ |ياك|ۇقل|ئار|ق ئ|ىنل|لار| ئې|ى ب|لىن|ڭ ئ|ئۆز|ق ھ|شى |ىمە|قلۇ|ن ئ|لەر|ەتل|نىش|ىك |ەھر| مە|ھرى|لەن|ىلا|ار |بەھ| ئۇ|ە ق|ئىي|اسى| مۇ|رلى| ئو|بىر|، ئ|بىل|ش ھ|بار|ى، |ۇ ھ|ايد|ۇشق|شكە|ە ب|يەت|ا ب|رنى|كە |ىسى| كې|ېلى|الى|ەك |م ئ|ماي|ولم|تنى|ىدا|ارى|يدۇ|لىد| قو|ەشك|تلە|ك ھ|انل|ەمد|مائ|ئال|ر ئ|مدە|ىيە|ش ئ|ە ھ|لما|ائى|ئىگ|دا |ي ئ|ۇشى|راۋ|ا، |سىي| تۇ|كىل|ە ت|ىقى|قى |ۆزى|ېتى|ىرى|ىر |ىپ |ى ك|ن، |ر ب|لەش|اسا|اۋا|ى ھ|شلى|ساس|ادى|تى |اشق|ەتت|قىغ|ىما|انى| خى|ۇرۇ| خە|ن ق|منى| خا|چە |ى ق| جە|رقى|تىد| ھۆ|باش|ارل|ئىش|تۇر| جى|مۇش|نۇن|شۇ |انۇ|ۇش |رەك|ېرە|كېر| سا|الغ|ۇنى|ئېل|ىشل|تەش|خەل|مەت|اش |دىغ|كەن|ەلق|تىش|مىن|ايى|سىز|ق ۋ|نىي|جىن|رىش|پ ق| كى|ېرى|ئاس|ەلى| ما|تتى|ىرل|ولى| دە|ارق|سىت|ە م| قە|شىل| تى|ەرن|كىش|ن ھ|ەلگ|ەمن|ك ئ| تو|ى ي|قتى|ئاش|تىم|تەۋ|ناي|ىدە|ىنا| بۇ|ىيا|زىن|امى|قار|شكى|ىز | ئۈ|ەۋە|ۆرم|ە خ|شىش|ىيى|جتى|ىجت|ئىج|نام|تەر",
    "pes": " و | حق| با|که |ند | که| در|در |رد | دا|دار|از | از|هر | هر|یت |ر ک|حق |د ه|ای |د و|ان | را|ین |ود |یا | یا|را |ارد|ی و|کس | کس| بر| آز|باش|ه ب|آزا|د ک| خو|ه ا|د ب|زاد| اس|ار | آن|ق د|شد |حقو|قوق|ی ب|وق |ده |ه د|ید |ی ک|و ا|ور |ر م|رای|اشد|خود|ادی|تما|ری | اج|ام |دی |اید|س ح|است|ر ا|و م| ان|د ا|نه | بی|با | هم| نم|مای| تا|د، |ی ا|انه|ات |ون |ایت|ا ب|ست | کن|برا|انو| بش| مو|این| مر|اسا| مل|وان|ر ب|جتم| شو| اع|ن ا|ورد| می| ای|آن | به|و آ|ملل|ا م|ماع|نی |ت ا|، ا|ت و|ئی |عی |ائی|اجت|و ب|های|ن م|ی ی|بشر|کند|شود| من| زن|ن و|ی، |بای|ی ر| مس|مل |مور|ز آ|توا|دان|اری|علا|گرد|یگر|کار| گر| بد|ن ب|ت ب|ت م|ی م| مق|د آ|شور|یه |اعی| عم|ر خ|ن ح| کش|رند|مین| اح|ن ت|ی د| مت|ه م|د ش| حم|و د|دیگ|لام|کشو|هٔ |ه و|انی|لی |ت ک| مج|ق م|میت| کا| شد|اه |نون| آم|اد |ادا|اعل|د م|ق و|ا ک|می |ی ح|لل |نجا| مح|ساس|یده| قا|بعی|قان|ر ش|مقا|ا د|هد |وی |نوا|گی |ساو|ر ت|بر |اً |نمی|اسی|اده|او | او| دی| هی|هیچ|ه‌ا|‌ها|یر |خوا|د ت|همه|ا ه|تی |حما|دگی|بین|ع ا|سان|ر و|شده|ومی| عق| بع|ز ح|شر |مند| شر|ٔمی|أم|تأ|انت|اند|اوی|مسا|ردد|بهر| بم|ارن|یتو|ل م|ران|و ه|ر د|م م|رار|عقی|سی |و ت|زش | بو|ا ا|ی ن|موم|جا |عمو|رفت|عیت| فر|ندگ|واه|زند|م و|نما|ه ح|ا ر|دیه|جام|مرد|ت، |د ر|مام| تم|ملی|نند|الم|طور|ی ت|تخا|ا ت|امی|امل|دد | شخ|شخص"
  },
  "Devanagari": {
    "hin": "के |प्र|और | और| के|ों | का|कार| प्|का | को|या |ं क|ति |ार |को | है|िका|ने |है |्रत|धिक| अध|अधि|की |ा क| कि| की| सम|ें |व्य|्ति|क्त|से | व्|ा अ|्यक|में|मान|ि क| स्| मे|सी |न्त| हो|े क|ता |यक्|क्ष|ै ।|िक |त्य| कर|्य | या|भी | वि|रत्|र स|ी स| जा|स्व|रों|्ये|ेक |येक|त्र|िया|ा ज|क व|र ह|ित |्रा|किस| अन|ा स|िसी|ा ह|ना | से| पर|र क| सा|देश|गा | । | अप|्त्|े स|समा|ान |ी क|्त |वार| ।प|ा प| रा|षा |न क|।प्|ष्ट|था |अन्| मा|्षा|्वा|ारो|तन्|वतन|ट्र|्वत|प्त|ाप्|्ट्|राष|ाष्| इस|े अ| उस| सं|राप|कि |त ह|हो |ं औ|ार्|ा ।|किय|े प| दे| भी|करन|री |जाए|ी प| न |र अ|क स|अपन|े व|ाओं|्तर|ओं | नि|सभी|रा | तथ|तथा|िवा|यों|पर | ऐस|रता|ारा|्री|सम्| द्|ीय |िए |व क|सके|द्व|होग| सभ|ं म|माज|रने|िक्|्या|ा व|र प| जि|ो स|र उ|रक्|े म|पूर| लि|ाएग| भा|इस |त क|ाव |स्थ|पने|ा औ|द्ध|श्य|र्व| घो|घोष|रूप|भाव|ाने|कृत|ो प|े ल|लिए|शिक|ूर्| उन|। इ|ं स|य क|्ध |दी |ी र|र्य|णा |एगा|न्य|रीय|ेश |रति|े ब| रू|ूप |परा|्र |तर्| पा| सु|जिस|तिक|सार|जो |ेशो| शि|ानव|ी अ|चित|े औ| पू|ियो|ा उ|म क|ी भ|शों| बु|म्म|स्त|िश्|्रो|्म |ो क| यह|र द|नव |चार|दिय|े य|र्ण|राध|ोगा|ले |नून|ानू|ोषण|षणा|विश| जन|ारी|परि|गी |वाह|साम|ाना|रका| जो|ाज |ी ज|ध क|बन्|ताओ|ंकि|ूंक|ास |कर |चूं|ी व|य ह|ा ग|य स|न स|त र|कोई|ुक्|ोई | ।क|ं न|हित|निय|याद|ादी|्मा|्था|ामा|ाह |ी म|े ज",
    "mar": "्या|या |त्य|याच|चा | व |ण्य|प्र|कार|ाचा| प्|धिक|िका| अध|अधि|च्य|ार |आहे| आह|ा अ|हे | स्|्रत|्ये|ा क|स्व| कर|्वा|ता |ास |ा स|ा व|त्र| त्|वा |ांच|यां|िक |मान| या|्य | का| अस|रत्|ष्ट|र्य|येक|ल्य|र आ|ाहि|क्ष| को|ामा|कोण| सं|ाच्|ात |ा न| रा|ंत्|ून |ेका| सा|राष|ाष्|चे |्ट्|ट्र|तंत| मा|ने |किं| कि|व्य|वात|े स|करण|ंवा|िंव|ये |क्त| सम|ा प|ना | मि|कास|ातं|्र्|र्व|समा|मिळ| जा|े प|व स|यास|ोणत|रण्|काम|ीय |ा आ| दे|े क|ांन|हि |रां| व्|्यक|ा म|िळण|ही | पा|्षण|ार्|ान |े अ| आप| वि|ळण्|ाही|ची |े व|्रा|मा |ली |ंच्|ारा|ा द| आण| नि|णे |द्ध| नय|ला |ा ह|नये| सर|सर्|्री|बंध|ी प|आपल|ले |ील |माज| हो|्त |त क|ाचे|्व |षण |ंना|लेल|ी अ|देश|आणि|णि |ध्य| शि|ी स|े ज|शिक|रीय|ानव|पाह|हिज|िजे|जे |क स|यक्|न क|व त|ा ज|यात|पल्|न्य|वी |स्थ|ज्य| ज्|े आ|रक्|त स|िक्|ंबं|संब| के|क व|केल|असल|य अ|य क|त व|ीत |णत्|त्व|ाने| उप|्वत|भाव|े त|करत|याह|रता|िष्|व म|कां|साम|रति|सार|ंचा|र व|क आ|याय|ासा|साठ|ाठी|्ती|ठी |ेण्|र्थ|ीने|े य|जाह|ोणा|संर|ायद|च्छ|स स|ंरक|तील|ी व|त आ|ी आ|ंधा|ेशा|ित | अश|हीर| हक|हक्|क्क|य व|शा |व आ|तीन|ण म|ूर्|ेल्|द्य|ेले|ांत|ा य|ा ब|ी म|ंचे|याव|देण|कृत|ारण|ेत |िवा|वस्|स्त|ाची|नवी| अर|थवा|अथव|ा त| अथ|अर्|ती |पूर|इतर|र्ण|ी क|यत्| इत| शा|रका|तिष|ण स|तिक|्रक|्ध |रणा| आल|ेल |ाजि| न्|धात|रून|श्र|असे|ष्ठ|ुक्|ेश |तो |जिक|े म",
    "mai": "ाक | आ |प्र|कार|िका|धिक|ार |्रत|ेँ |क अ|्यक|िक |्ति| अध|व्य|अधि|क स| प्|क्त| व्|केँ|यक्|तिक|न्त| स्|हि |क व|मे |बाक|मान| सम|त्य|क्ष| छै|छैक|ेक |स्व|त्र|रत्|्ये|ष्ट| अप|येक|र छ|सँ |वा | एह|ैक।|ित | वि| जा|ति |्त्|ट्र|िके|राष|ाष्| हो|्ट्| रा|्य | सा| अन| कर|अपन|।प्|कोन|अछि|वतन|्वत|तन्|क आ| अछ|ताक|था | पर| वा| को|ार्|एहि|पन |ा आ|नहि|नो |समा| मा|्री|रता| नि| का|देश| नह|्षा|क प| दे| कए|रक | सं|ोनो|ि क|न्य|आ स|छि |्त |ल ज|्वा|ारक|ा स|तथा|ान्| तथ|्या|आ अ|ना |ँ क|ान | जे|जाए|वार|ता |ीय |र आ|क ह|करब|िवा|ामा|र्व| आओ|्रस|परि|त क|स्थ|ा प|ानव|रीय|धार|्तर|अन्|घोष|साम|माज|आओर|ारण| एक|कएल|ँ अ|ओर |एबा|स्त|द्ध|्रा|ँ स|रण | सभ|ोषण|क।प|ाहि|रबा|क ज|ा अ|चित|यक |कर |पूर|रक्|नक | घो|षा |िक्|सम्|एहन| उप|र प| अव|एल |ूर्|षणा| हे|त अ|शिक|तु |ाधि|ेतु|हेत|हन |िमे|र अ|वक |ँ ए|जाह| शि|आ प|भाव|े स|्ध |क क|ि ज|प्त|रूप|निर|िर्| सक|च्छ|होए|रति|अनु|सभ |हो |ेल |त आ|चार|ण स|रा |त ह|जिक|ाजि|र्ण|्रक|एत।|ि आ|र्य|सभक|ैक |क उ| जन|त स|ाप्|न प|श्य|न अ|कृत|हु |रसं|री |राप|ा व|जे |क ब|ि घ| भा|उद्|ाएत|्ण |विव| उद|वाध|िसँ|आ व|ि स|न व|ारा|ोएत| ओ |य आ|कान|िश्|न क| दो|णाक| द्|हिम| अथ|अथव|ामे|द्व|ेश |ओ व|ि अ|क ए|वास| पू|षाक|त्त|य प| बी|यता|धक |ए स|थवा|ि द|पर | भे|जेँ| कि|कि |क ल| रू|विश|न स| ले|सार|ाके|िष्|रिव|क र|ास |ेओ |्थि|केओ|राज",
    "bho": " के|के |ार |े क|कार|धिक|िका|ओर |आओर| आओ| अध|अधि|े स|ा क|े अ| हो| सं|र क|र स|ें | मे|में|िक | कर|ा स|र ह| से|से |रा |मान| सम|न क|क्ष|े ब|नो | चा|वे |ता |चाह|ष्ट| रा|ति |्रा|खे |राष|ाष्|प्र| सा| का|ट्र|े आ| प्| सक| मा|्ट्| स्|होख| बा|करे|ि क|ौनो|त क|था |कौन|पन | जा| कौ|रे |ाति|ला | ओक|ेला|तथा|आपन|्त | आप|कर |हवे|र म| हव| तथ|सबह|र आ|ोखे| ह।|िर |े ओ|केल|सके|हे | और|ही |तिर|त्र|जा |ना |बहि|।सब|े च| खा|े म| पर|खात|ान |र ब|न स|ावे| लो|षा |ाहे|ी क|ओकर|ा आ|माज|ित |े ज|ल ज|मिल|संग|्षा|ं क| सब|ा प|और |रक्|वे।|िं |े ह|ंत्|ाज |स्व|हिं|नइख|कान|ो स| जे|समा|क स|लोग|करा|क्त|्रत|ला।| नइ|े। |ानव|िया|हु |इखे|्र |रता|्वत|ानू|े न|ाम |नून|ाही|वतं|पर |ी स| ओ |े उ|े व|्री|रीय|स्थ|तंत|दी |ीय |े त|र अ|र प|्य |साम|बा।| आद|ून |। स|व्य|ा।स|सभे|भे |या | दे|ा म|े ख| वि| सु|केह|प्त|योग|ु क|ोग |े द|चार|ादी|ाप्| दो| या|राप|ल ह|पूर| मि|तिक|खल |यता|्ति| बि|ए क|आदि|दिम| ही|हि |मी | नि|र न| इ |ेहु|नवा|ा ह|री |ले | पा|ाधि| सह| उप|्या| जर|षण | सभ|िमी|देश|े प|म क|जे |ाव | अप|शिक|ाजि|जाद|जिक|े भ|क आ|्तर|िक्|ि म|ेकर|ुक्|वाध|गठन| व्|निय|ठन |।के|ामा|रो | जी|य क|न म|े ल|न ह|ास |ेश | शा|घोष|ंगठ|िल | घो|्षण| पू|े र|ंरक|संर|उपय|पयो|हो |बा |ी ब|्म |सब |दोस|ा। | आज|साथ| शि|आजा| भी| उच|ने |चित| अं|र व|ज क|न आ| ले|नि |ार्|कि |याह|्थि",
    "nep": "को | र |कार|प्र|ार |ने |िका|क्त|धिक|्यक| गर|व्य|्रत| प्|अधि|्ति| अध| व्|यक्|मा |िक |त्य|ाई |लाई|न्त|मान| सम|त्र|गर्|र्न|क व| वा|्ने|वा | स्|रत्|र स|्ये|तिल|येक|ेक |छ ।|ो स|ा स|हरू| वि|क्ष|्त्|िला| । |स्व|हुन|ति | हु|ले | रा| मा|ष्ट|समा|वतन|तन्| छ |र छ| सं|्ट्|ट्र|ाष्|ो अ|राष|्वत|ुने|नेछ|हरु|ान |ता |े अ|्र | का|िने|ाको|गरि|े छ|ना | अन| नि|रता|नै | सा|ित |तिक|क स|र र|रू |ा अ|था |स्त|कुन|ा र|ुनै| छै|्त |छैन|ा प|ार्|वार|ा व| पर|तथा| तथ|का |्या|एको|रु |्षा|माज|रक्|परि|द्ध|। प| ला|सको|ामा| यस|ाहर|ेछ |धार|्रा|ो प|नि |देश|भाव|िवा|्य |र ह|र व|र म|सबै|न अ|े र|न स|रको|अन्|ताक|ंरक|संर|्वा| त्|सम्|री |ो व|ा भ|रहर| कु|्रि|त र|रिन|श्य|पनि|ै व|यस्|ारा|ानव| शि|ा त|लाग|रा |शिक| सब|ाउन|िक्|्न |ारक|ा न|रिय|्यस|द्व|रति|चार| सह|्षण| सु|ारम|ुक्|ुद्|साम|षा |ैन | अप| भए|बाट|ुन | उप|ान्|ो आ|्तर|िय |कान|ि र|रूक|द्द|र प|ाव |ो ल|तो | पन|ैन।| आव|ा ग|।प्|बै |ूर्|िएक|र त|निज|त्प| भे|जिक|ेछ।|िको|्तो|वाह|त स|ाट | अर|ाजि|्ध | उस|रमा|ात्|र्य|नको|ाय |जको|ित्|ागि| अभ|न ग|गि |ा म| आध|स्थ| पा|ारह|घोष|त्व|यता|ा क|र्द| मत|विध| सक|सार|परा|युक|राध| घो|णको|अपर|े स|ारी|।कु| दि| जन|भेद|रिव|उसक|क र|र अ|ि स|ानु|ो ह|रुद| छ।|ूको|रका|नमा| भन|र्म|हित|पूर|न्य|क अ|ा ब|ो भ|राज|अनु|ोषण|षणा|य र| मन| बि|्धा| दे|निर|ताह|र उ|यस |उने|रण |विक",
    "mag": "के | के|ार | हई|कार|िका|धिक|हई।| और|े अ|और |अधि| अध|ा क|र ह|े स|े क|सब |ें |में| मे| कर|से | सम|था |तथा| हो| से|र स|र क|िक | तथ| सब| सं|क्ष|मान|ब क|ा स|ना | सा|प्र|कर | प्| भी|ति |ई। |रा |भी |्रा| अप| का|त क|या |अपन| को|ट्र|क ह|पन | पर| मा| रा| या|ी क|ता | स्| ओक|ष्ट|ही |ान |्त |करे|्रत|त्र|ाष्|्ट्| सक|न क|राष|ओकर|।सब|रे |ेल |हई |े ब| जा|ई।स|रक्| ले|ंत्|े म| ही|सक |नो |र म| ना|स्व|ाम |होए|र औ|दी |व्य|क्त|ा प|वतं|ानव|ित | शा|ादी|षा |माज| इ |तंत|पर |ी स|्वत|्य |े उ|्र |ोग |वे |्षा|े भ|े ल|न स|करा|कान| एक|ल ज|म क|लेल|्ति|ावे| दे|रता|क स|साथ|ानू|नून|ेकर|र अ|य क|ाथ |प्त|ा म|ला |ई।क| वि|समा|ून |े प|साम|। स|ा ह| जे|े ह| चा|ोई |जा |मिल| व्|ि क|बे |ाप्|राप|ोए |रो |वार|कोई|चाह| दो|व क| नि|चार|र व|ाधि| पा|र प|स्त|एल |कोन|े व|ोनो|काम|ो स|्म |े ओ|योग| सु|ए क|नवा|न ह|षण |ीय |एक |परि| उप|े आ|्तर| सह|ाजि|ल ह|संर|ई क|ास |पूर|ं स|ंरक|ो क|जिक|देश|ुक्|ामा|होब|सम्|।के|्यक|े च|केक|्वा|पयो|उपय|री |ी ह|ाही|दोस|र आ| उच|ाति|म्म|्मा|े ख| लो|तिक|रति|ेश |न औ|स्थ|वा |मी |े त| आद|निय|न प|वाध| घो|घोष|ब अ|रिव|ा ब|कि |म स|रीय|्री|य स|यक्|ि म|ा द|ा त|ब ह|जाद|उचि|युक|ंयु|संय| उ |इ स|े इ|्षण|। त|चित|ा औ|व ह|हे |त स| पू|क औ|ग क|े न|न द|करो|लोग|ोषण|ारा|र न|िल |समय|कौन|ं क|मय |ौनो|ुरक|ो भ| भा|ाज | कए|कएल|सुर|र्म|ाव |िवा"
  },
  "Ethiopic": {
    "amh": "፡መብ|ሰው፡|ት፡አ|ብት፡|መብት|፡ሰው|፡አለ|፡ወይ|ወይም|ይም፡|ነት፡|ንዱ፡|አለው|ለው።|ዳንዱ|ያንዳ|ንዳን|እያን|ዱ፡ሰ|ት፡መ|፡እን|፡የመ|።እያ|እንዲ|፡ነጻ|፡የተ|ም፡በ|ው፡የ|ም፡የ|፡የሚ|ና፡በ|ን፡የ|፡የማ|፡አይ|ነጻነ|ና፡የ|ው፡በ|ቶች፡|ው።፡|ሆነ፡|ት፡የ|፡በሚ|፡መን|ው።እ|ትና፡|ኀብረ|ትን፡|ውም፡|ንኛው|እኩል|ብቻ፡|ኛውም|ንም፡|፡ለመ|፡ያለ|ም፡ሰ|ማንኛ|መብቶ|፡አገ|ት፡በ|ራዊ፡|፡እኩ|፡ለማ|ለት፡|በት፡|ሆን፡|መንግ|፡በተ|ረት፡|ብቶች|ጋብቻ|ዎች፡|ህንነ|ጻነት|ም፡እ|ወንጀ|፡ልዩ|ሰብ፡|ማንም|ጠበቅ|ኩል፡|ደህን|።ማን|ነጻ፡|ግኘት|ማግኘ|።፡እ|፡የሆ|፡ሁሉ|ች፡በ|፡በመ|ሥራ፡|፡ደህ|ፈጸም|ል፡መ|ተግባ|፡ድር|ት፡ወ|ው።ማ|ፍርድ|ርድ፡|፡በሆ|ር፡ወ|በትም|ትም፡|ይነት|ቸው፡|ብ፡የ|ነትና|ቱን፡|ሕግ፡|ንና፡|፡ሥራ|የማግ|፡መሠ|ኘት፡|፡ጊዜ|ጻነቶ|ነቶች|በር፡|በኀብ|ዩነት|ልዩነ|፡በኀ|፡ዓይ|ዓይነ|ችና፡|ግባር|ባር፡|፡ደረ|ነው።|፡ነው|ደረጃ|ም።እ|ም፡መ|፡ወን|ይማኖ|ማኀበ|ሃይማ|፡ኑሮ|መሠረ|ሁሉ፡|ነቱ፡|ሌሎች|ንግሥ|በቅ፡|የሆነ|፡ይህ|ንዲጠ|ገር፡|ተባበ|ትክክ|ጸም፡|ር፡የ|ዲጠበ|ትም።|ው፡ከ|፡እያ|ሩት፡|ድርጅ|፡ብቻ|ና፡ለ|ይገባ|የመኖ|፡ማን|ንነት|ቤተሰ|ርጅት|ት፡ድ|፡መሰ|እንደ|፡አላ|ብሔራ|ት፡ለ|ሔራዊ|ርት፡|ህርት|ውን፡|የሚያ|ል።እ|ሆኑ፡|ምህር|ትምህ|በት።|ለበት|አለበ|፡አስ|ሎች፡|ች፡የ|፡በሕ|ብረ፡|፡ከሚ|ን፡አ|ት፡እ|ን፡ወ|ረግ፡|በሆነ|የኀብ|፡የኀ|መሆን|፡መሆ|ን፡መ|፡ውሳ|ንጀል|ፈላጊ|ህም፡|ረታዊ|ክለኛ|ክክለ|ታዊ፡|ጀል፡|ኑሮ፡|።፡ይ|ዓዊ፡|ዜግነ|ንዲሁ|ዲሁም|፡ማኀ|ገሩ፡|ር፡በ|ብዓዊ|አገሩ|ሁም፡|ና፡ነ|ሰብዓ|የተባ|ጅት፡|ማኖት|ር፡አ|ንግስ|ኖት፡|በሕግ|መኖር|ው፡ያ|መጠበ|ረጃ፡|፡በማ|ነትን|ብነት|ገብነ|፡ገብ|መፈጸ|፡ሁኔ|ሁኔታ|ን፡ለ|ው፡ለ|፡ተግ|፡የአ|፡ይገ|፡በአ|ችን፡|፡ትም|ነቱን|፡ቢሆ|ቢሆን|ጊዜ፡|ረ፡ሰ|ት፡ጊ|ሰቡ፡|ምበት|ላቸው|አላቸ|በነጻ|፡በነ|አንድ|ቅ፡መ|፡መጠ|ት፡ይ|መሰረ|ጥ፡የ|ስጥ፡|ፈጸመ|ውስጥ|ንድ፡|፡ውስ|፡በግ|፡ሆኖ|ሉ፡በ|፡ጋብ|ንስ፡|ንነቱ|መው፡|የሚፈ|አይፈ|ብረሰ|ነ፡መ|፡የሃ|ም፡ከ|ች፡እ|ስት፡|ሙሉ፡|አገር|ሆኖ፡|ደረግ|ኢንተ|ንተር|ተርና|ርናሽ|ናሽና|ሽናል",
    "tir": " መሰ| ሰብ|ሰብ | ኦለ|ትን |ኦለዎ|ናይ | ናይ| ኦብ|ዎ፡፡|ለዎ፡|ሕድሕ|ኦብ |ድሕድ|ሕድ |መሰል|ውን |ሰል |ድ ሰ|ይ ም|ል ኦ|ካብ |፡ሕድ|፡፡ሕ| ወይ|ወይ | መን| ነፃ|ን መ|ዝኾነ|፡፡ |ታት |ብ ዝ|ነት |ን ነ| ካብ|መሰላ|ነፃነ| እዚ|ብ መ|ኦዊ |ታትን|መንግ|ዊ መ| እን|ብ ብ|ንግስ|ት ኦ|ሰላት|ን ም|ኾነ |እዚ |ብኦዊ|ሰብኦ|ን ኦ|ን፡፡| ንክ| ዝኾ|ን ን| ምር|ኹን |ይኹን| ይኹ|ምርካ|ርካብ| ኦይ| ሃገ|ሕጊ |ራት |ሎም | ብሕ|ነ ይ| ከም|ማዕሪ|ይ ብ| ንም| ዝተ|ርን |ን ብ|ራዊ | ፣ |ብ ሕ|ላትን|ብ ኦ|ማሕበ|ነታት| ኦድ|ዕሪ | ማዕ|ስታት|ግስታ|’ውን|ት መ|ን ዝ|ታዊ |፣ ብ| ማሕ|ነትን|ንጋገ|ድንጋ| ስለ| ድን|ስራሕ|ኩሎም|ሕበራ|ኦት |ን ሰ|ዓለም|ፃነታ| ብም|ት ወ|መሰሪ| ስራ|ፃነት|ተሰብ|ካልኦ|ልኦት|ን ሓ|ዓት |ዋን |ቡራት|ሕቡራ| ሕቡ|ብሕጊ|ድብ |ውድብ| ውድ|ብን |ትምህ|ነቱ |ዚ ድ|፣ ኦ|ሃገራ| ኩሎ|ለዎም|ምህር|ም፡፡|ም መ| ብዝ|ምኡ’|ኡ’ው|እንት| ዓለ| ብዘ|በራዊ| ሓለ|ሓለዋ|ዎም፡|ቱ ን|ት ብ|ጋገ |ነፃ | ምዃ|ን ዘ| ገበ|ት፣ | ትም|ኸውን|ራሕ | ዘይ|ህርቲ|ርቲ |ከምኡ|ሃይማ| ምስ|ነ፣ |እንተ| ስር|ስርዓ|ርዓት|ባት |ይማኖ|ሰሪታ|ን ና| ክብ|ልን | ብማ|ገሩ | ህዝ|ላት |ት ና|ይ ኦ|ዕሊ |ለዝኾ|ስለዝ|ሪተሰ|ብሪተ|ሕብሪ| ሕብ|ን ተ|ኾነ፣|በን |ሃገሩ|ገ እ|ኻዊ | ሃይ|እን |ሪጋገ| ምሕ|ን እ|ለኻዊ|ር፣ | ብሓ| ብሃ| ክኸ|ክኸው|ብ ዘ|ዃኑ |ዊ ክ|ምን |ሓደ |ምዃኑ|ም ን|ት እ|ዊ ወ|ታውን| ሕድ|ብዘይ| ሕጊ|ት ን| ልዕ| ካል|ን ካ|ሰባት|ን ስ|ናን |ቤተሰ|ሕን |ለምለ|ት ስ|ምለኻ|፣ ከ|ተደን|ባል |ኦድላ|እዋን| እዋ|ደቂ | ደቂ| ሰባ|ፃን |ነፃን|ግስቲ|፣ ን|ዚ ብ|ስቲ | ቤተ|ምጥሓ| ክሳ| ነዚ|ን ክ|ነቲ | ነቲ|ነዚ | ምእ|ብነፃ| ምዕ|ምዕባ|ዕባለ|ክሳብ| ብነ|ል እ|ዚ መ|ልዕሊ|ክብሩ|ብማዕ|ሳብ |ህይወ|ኦቶም|ምስ |ንገገ|እምነ| እም|ድ ኦ|ቶም |ቲ ክ|ፍትሓ|ለም | ፍት|ብ ን|ን ዓ|ራውን|ሓፈሻ|ደንገ|ም ብ|ትዮን| ዝሰ|ዝተደ|ሉ መ|ብ ና|ጊ ካ|ልዎ |ኦባል| ኦባ|ድልዎ|ን ድ|ኦድል|ዜግነ|ላውን| ድሕ"
  },
  "Hebrew": {
    "heb": "ות |ים |כל |ת ה| כל|דם |אדם|יות| של| זכ|ל א| אד|של |ל ה|אי |ויו|כאי|ת ו|י ל|זכא| ול|לא | וה|רות|זכו|ית |ירו|ין | או|ם ז| לא| הח|או | הא| וב| המ|חיר|ת ל|יים|ם ל|את |ת ב|ת ש|רה |ון | לה|נה |כוי|ותי|ה ש|ו ל|ו ב| הו|ת א|ם ב|ם ו|תו | את|לה |ני |אומ| במ|דה |א י|ה ה|ה ב|על |ם ה| על|הוא|וך |ה א|בוד|וד |ואי|נות|ה ו|ת כ|י ה|יה |ם ש|ו ו| שה|ם א|ו כ|ינו|ן ה| שו|שוו|החי|כות|לאו|בות|דות|ה ל|לית|ה מ| בי|וה |וא | הי| לפ|ור | לב|ל ב|בחי|הכר|לו |ת מ|ן ש|החו|ה כ| בכ|ומי|בין|ן ו|ן ל|רוי|פלי|ולה|ליה| הז|חינ| לע| בנ|יבו|חוק| אח|חבר| יה| חי|מי |ירה| חו|האד|ווה|חופ|ופש|וק |נו |יו |ל מ|מדי|כבו| הע|נוך| הד|י א|י ו| הכ|בני|עה |ו א|רצו|דינ|בזכ|מות|יפו| אל|סוד|לם |איש|רך | אי|הגנ|הם |פי |ם כ|חות|ל ו|איל|ילי|תיה|כלל|אלי|יסו|האו|זש | בא|ר א|ו ה|זו |אחר| הפ| בע| בז|משפ| בה| לח|דרך|ומו| בח| דר| מע|ל י|תוך|מנו| בש|לל |רבו| למ|פני| לק|תם |שה |שית|ללא|לפי|היה|מעש|דו |שות|להג|וצי|שוא|אין|וי |תי |ונו|ליל| לו|חיי|ל ז| זו|היא|יא |נתו|ה פ|לת |ובי| לכ|ך ה|יל |י ש|שיו|ן ב|עול|המד|ודה|ולם| ומ|א ה|ולא| בת|הכל| סו| מש| עב|סוצ|ארצ| אר|ציא|ד א|לחי|הן |יחס| יח|יאל|הזכ|ם נ| שר|בו |עבו|היס| לי|ת ז|פול|יהי|גבל|תיו|המא|שהי|א ל|מאו| יו|ותו|ישי|גנה|פשי|וחד|יהם|חרו|לכל|ידה|עות|ונה|ום |חה |עם |שרי|ם י|שר |והח| אש| הג|ק ב|הפל|נשו|הגב|ד ו",
    "ydd": " פֿ|ון |ער |ן א| אַ|דער|ט א| או|און|אַר|ען |פֿו| אױ| אי|ן פ|ֿון|רעכ| דע| רע|עכט|פֿא|ן ד|כט | די|די |אַ |אױף|ױף |ֿאַ| זײ| גע|אַל|אָס| אָ|ונג| הא|האָ|זײַ| מע|אָל|נג |װאָ|ַן |אַנ|רײַ| װא|ָס |באַ| יע|יעד|ניט|ן ז|ר א|יט |אָט|אָר|עדע|מען|זאָ|ָט |פֿר|ײַן| בא|טן |אין|ן ג|ין |ן װ|נאַ|ֿרײ|ר ה| זא|לעכ|ע א|אָד|ַ ר|ענט|אַצ|ַצי|אָנ| צו| װע|יז |מענ|ָדע|איז|ן מ|ַלע|בן |ר מ|טער| מי| פּ|מיט|טלע|ָל |עכע|ײט |ַנד|ע פ|לע |געז|לאַ|אַפ|עזע|ראַ| ני|ַפֿ|רן |ײַנ|נען|טיק|כע |פֿע|יע |הײט|ַהײ|נטש|ײַה|ט ד|ן ב|לן |ן נ|פֿט|שאַ|רונ| זי| װי|ט פ| דא|טאָ|דיק|קן |ר פ|ר ג|יקן|אָב|ף א|אַק|קער|ערע|כער|י פ|ות |ַרב|פּר|קט |עם |יאָ|ציע|ציא|יט־|צו |ישע| קײ|ן ק|סער| גל|דאָ|ונט|גן |ַרא|יקע| טא|ענע|לײַ|שן |ַנע|יק |טאַ|ס א|עט |נגע|ט־א|ָנא|־אי|יקט|נטע|ײנע|־ני|ָר |װער|י א|ן י|יך |זיך|ער־|ערן|אױס|ָבן|נדע|ָסע|װי |ֿעל|ר־נ|ן ה| גר|גלײ| צי|ראָ|זעל|עלק|נד |לקע|אָפ| כּ|ט װ|ג א| נא|ט צ|ר ד|עס |דור|גען|קע |ג פ|ֿט |ן ל|שע |ר ז|רע |ײטן|פּע|קלא|קײט|יטע|ים |ס ז|ײַ | דו|אַט| לא|ר װ|קײנ|עלש|י ד|לשא|יות|נט |ַרז|ע ר|ל ז|אַמ|ן ש| שו|אינ|נטל| הי|בעט|ָפּ|ף פ|ײַכ|בער|ן צ|מאָ| שט| לע|גער|ורך|רך |נעם|גרו|פֿן|לער|װעל|ע מ|ום |שפּ|ך א|יונ|רבע|עפֿ|טעט|ן כ|רעס|ערצ|ז א|עמע|ם א|שטע|כן |רט |י ג|סן |נער|ליט|ט ז|נעמ|ּרא|היו|אַש|ת װ|אומ|ק א|יבע|ֿן |ץ א|פֿי|ײן |ם ט"
  }
}
},{}],22:[function(require,module,exports){
/* eslint-env commonjs */

module.exports = {
    'cmn': /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FCC\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/g,
    'Latin': /[A-Za-z\xAA\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02E0-\u02E4\u1D00-\u1D25\u1D2C-\u1D5C\u1D62-\u1D65\u1D6B-\u1D77\u1D79-\u1DBE\u1E00-\u1EFF\u2071\u207F\u2090-\u209C\u212A\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uFB00-\uFB06\uFF21-\uFF3A\uFF41-\uFF5A]/g,
    'Cyrillic': /[\u0400-\u0484\u0487-\u052F\u1D2B\u1D78\u2DE0-\u2DFF\uA640-\uA69D\uA69F]/g,
    'Arabic': /[\u0600-\u0604\u0606-\u060B\u060D-\u061A\u061E\u0620-\u063F\u0641-\u064A\u0656-\u065F\u066A-\u066F\u0671-\u06DC\u06DE-\u06FF\u0750-\u077F\u08A0-\u08B2\u08E4-\u08FF\uFB50-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE70-\uFE74\uFE76-\uFEFC]|\uD803[\uDE60-\uDE7E]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB\uDEF0\uDEF1]/g,
    'ben': /[\u0980-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FB]/g,
    'Devanagari': /[\u0900-\u0950\u0953-\u0963\u0966-\u097F\uA8E0-\uA8FB]/g,
    'jpn': /[\u3041-\u3096\u309D-\u309F]|\uD82C\uDC01|\uD83C\uDE00|[\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF6F\uFF71-\uFF9D]|\uD82C\uDC00/g,
    'kor': /[\u1100-\u11FF\u302E\u302F\u3131-\u318E\u3200-\u321E\u3260-\u327E\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g,
    'tel': /[\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7F]/g,
    'tam': /[\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA]/g,
    'guj': /[\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1]/g,
    'mal': /[\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D75\u0D79-\u0D7F]/g,
    'kan': /[\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2]/g,
    'mya': /[\u1000-\u109F\uA9E0-\uA9FE\uAA60-\uAA7F]/g,
    'ori': /[\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77]/g,
    'pan': /[\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75]/g,
    'Ethiopic': /[\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]/g,
    'tha': /[\u0E01-\u0E3A\u0E40-\u0E5B]/g,
    'sin': /[\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4]|\uD804[\uDDE1-\uDDF4]/g,
    'ell': /[\u0370-\u0373\u0375-\u0377\u037A-\u037D\u037F\u0384\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03E1\u03F0-\u03FF\u1D26-\u1D2A\u1D5D-\u1D61\u1D66-\u1D6A\u1DBF\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u2126\uAB65]|\uD800[\uDD40-\uDD8C\uDDA0]|\uD834[\uDE00-\uDE45]/g,
    'khm': /[\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u19E0-\u19FF]/g,
    'hye': /[\u0531-\u0556\u0559-\u055F\u0561-\u0587\u058A\u058D-\u058F\uFB13-\uFB17]/g,
    'sat': /[\u1C50-\u1C7F]/g,
    'bod': /[\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FD4\u0FD9\u0FDA]/g,
    'Hebrew': /[\u0591-\u05C7\u05D0-\u05EA\u05F0-\u05F4\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4F]/g,
    'kat': /[\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u10FF\u2D00-\u2D25\u2D27\u2D2D]/g,
    'lao': /[\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF]/g,
    'iii': /[\uA000-\uA48C\uA490-\uA4C6]/g,
    'aii': /[\u0700-\u070D\u070F-\u074A\u074D-\u074F]/g
};

},{}],23:[function(require,module,exports){
'use strict';

/* eslint-env commonjs */

/*
 * Load `trigram-utils`.
 */

var utilities = require('trigram-utils');

/*
 * Load `expressions` (regular expressions matching
 * scripts).
 */

var expressions = require('./expressions.js');

/*
 * Load `data` (trigram information per language,
 * per script).
 */

var data = require('./data.json');

/*
 * Construct trigram dictionaries.
 */

(function () {
    var languages;
    var name;
    var trigrams;
    var model;
    var script;
    var weight;

    for (script in data) {
        languages = data[script];

        for (name in languages) {
            model = languages[name].split('|');

            weight = model.length;

            trigrams = {};

            while (weight--) {
                trigrams[model[weight]] = weight;
            }

            languages[name] = trigrams;
        }
    }
})();

/*
 * Maximum sample length.
 */

var MAX_LENGTH = 2048;

/*
 * Minimum sample length.
 */

var MIN_LENGTH = 10;

/*
 * The maximum distance to add when a given trigram does
 * not exist in a trigram dictionary.
 */

var MAX_DIFFERENCE = 300;

/**
 * Deep regular sort on the number at `1` in both objects.
 *
 * @example
 *   > [[0, 20], [0, 1], [0, 5]].sort(sort);
 *   // [[0, 1], [0, 5], [0, 20]]
 *
 * @param {Object} a - Left-hand.
 * @param {Object} b - Right-hand.
 */
function sort(a, b) {
    return a[1] - b[1];
}

/**
 * Filter `languages` by removing languages in
 * `blacklist`, or including languages in `whitelist`.
 *
 * @param {Object.<Object>} languages - Languages
 *   to filter
 * @param {Array.<string>} whitelist - Whitelisted
 *   languages; if non-empty, only included languages
 *   are kept.
 * @param {Array.<string>} blacklist - Blacklisted
 *   languages; included languages are ignored.
 * @return {Object.<Object>} - Filtered array of
 *   languages.
 */
function filterLanguages(languages, whitelist, blacklist) {
    var filteredLanguages;
    var language;

    if (whitelist.length === 0 && blacklist.length === 0) {
        return languages;
    }

    filteredLanguages = {};

    for (language in languages) {
        if (
            (
                whitelist.length === 0 ||
                whitelist.indexOf(language) !== -1
            ) &&
            blacklist.indexOf(language) === -1
        ) {
            filteredLanguages[language] = languages[language];
        }
    }

    return filteredLanguages;
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and a language dictionary.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<number>} model - Object
 *   containing weighted trigrams.
 * @return {number} - The distance between the two.
 */
function getDistance(trigrams, model) {
    var distance = 0;
    var index = -1;
    var length = trigrams.length;
    var trigram;
    var difference;

    while (++index < length) {
        trigram = trigrams[index];

        if (trigram[0] in model) {
            difference = trigram[1] - model[trigram[0]] - 1;

            if (difference < 0) {
                difference = -difference;
            }
        } else {
            difference = MAX_DIFFERENCE;
        }

        distance += difference;
    }

    return distance;
}

/**
 * Create a single tuple as a list of tuples from a given
 * language code.
 *
 * @param {string} language - A single language.
 * @return {Array.<Array.<string, number>>} An array
 *   containing a single language--distance.
 */
function singleLanguageTuples(language) {
    return [[language, 1]];
}

/**
 * Create a single `und` tuple.
 *
 * @return {Array.<Array.<string, number>>} An array
 *   containing a single language--distance.
 */
function und() {
    return singleLanguageTuples('und');
}

/**
 * Get the distance between an array of trigram--count
 * tuples, and multiple trigram dictionaries.
 *
 * @param {Array.<Array.<string, number>>} trigrams - An
 *   array containing trigram--count tuples.
 * @param {Object.<Object>} languages - multiple
 *   trigrams to test against.
 * @param {Object} options - Configuration.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function getDistances(trigrams, languages, options) {
    var distances = [];
    var whitelist = options.whitelist || [];
    var blacklist = options.blacklist || [];
    var language;

    languages = filterLanguages(languages, whitelist, blacklist);

    for (language in languages) {
        distances.push([
            language,
            getDistance(trigrams, languages[language])
        ]);
    }

    return distances.length ? distances.sort(sort) : und();
}

/**
 * Get the occurrence ratio of `expression` for `value`.
 *
 * @param {string} value - Value to check.
 * @param {RegExp} expression - Code-point expression.
 * @return {number} Float between 0 and 1.
 */
function getOccurrence(value, expression) {
    var count = value.match(expression);

    return (count ? count.length : 0) / value.length || 0;
}

/**
 * From `scripts`, get the most occurring expression for
 * `value`.
 *
 * @param {string} value - Value to check.
 * @param {Object.<RegExp>} scripts - Top-Scripts.
 * @return {Array} Top script and its
 *   occurrence percentage.
 */
function getTopScript(value, scripts) {
    var topCount = -1;
    var topScript;
    var script;
    var count;

    for (script in scripts) {
        count = getOccurrence(value, scripts[script]);

        if (count > topCount) {
            topCount = count;
            topScript = script;
        }
    }

    return [topScript, topCount];
}

/**
 * Normalize the difference for each tuple in
 * `distances`.
 *
 * @param {string} value - Value to normalize.
 * @param {Array.<Array.<string, number>>} distances
 *   - List of distances.
 * @return {Array.<Array.<string, number>>} - Normalized
 *   distances.
 */
function normalize(value, distances) {
    var min = distances[0][1];
    var max = (value.length * MAX_DIFFERENCE) - min;
    var index = -1;
    var length = distances.length;

    while (++index < length) {
        distances[index][1] = 1 - ((distances[index][1] - min) / max) || 0;
    }

    return distances;
}

/**
 * Get a list of probable languages the given value is
 * written in.
 *
 * @param {string} value - The value to test.
 * @param {Object} options - Configuration.
 * @return {Array.<Array.<string, number>>} An array
 *   containing language--distance tuples.
 */
function detectAll(value, options) {
    var settings = options || {};
    var minLength = MIN_LENGTH;
    var script;

    if (settings.minLength !== null && settings.minLength !== undefined) {
        minLength = settings.minLength;
    }

    if (!value || value.length < minLength) {
        return und();
    }

    value = value.substr(0, MAX_LENGTH);

    /*
     * Get the script which characters occur the most
     * in `value`.
     */

    script = getTopScript(value, expressions);

    /*
     * One languages exists for the most-used script.
     *
     * If no matches occured, such as a digit only string,
     * exit with `und`.
     */

    if (!(script[0] in data)) {
        return script[1] === 0 ? und() : singleLanguageTuples(script[0]);
    }

    /*
     * Get all distances for a given script, and
     * normalize the distance values.
     */

    return normalize(value, getDistances(
        utilities.asTuples(value), data[script[0]], settings
    ));
}

/**
 * Get the most probable language for the given value.
 *
 * @param {string} value - The value to test.
 * @param {Object} options - Configuration.
 * @return {string} The most probable language.
 */
function detect(value, options) {
    return detectAll(value, options)[0][0];
}

/*
 * Expose `detectAll` on `detect`.
 */

detect.all = detectAll;

/*
 * Expose `detect`.
 */

module.exports = detect;

},{"./data.json":21,"./expressions.js":22,"trigram-utils":26}],24:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

},{}],25:[function(require,module,exports){
'use strict';

/**
 * A factory returning a function that converts a given string to n-grams.
 *
 * @example
 *   nGram(2) // [Function]
 *
 * @example
 *   nGram(4) // [Function]
 *
 *
 * @param {number} n - The `n` in n-gram.
 * @throws {Error} When `n` is not a number (incl. NaN), Infinity, or lt 1.
 * @return {Function} A function creating n-grams from a given value.
 */
function nGram(n) {
    if (
        typeof n !== 'number' ||
        n < 1 ||
        n !== n ||
        n === Infinity
    ) {
        throw new Error(
            'Type error: `' + n + '` is not a valid argument for n-gram'
        );
    }

    /*
     * Create n-grams from a given value.
     *
     * @example
     *   nGram(4)('n-gram')
     *   // ['n-gr', '-gra', 'gram']
     *
     * @param {*} value - The value to stringify and convert into n-grams.
     * @return {Array.<string>} n-grams
     */

    return function (value) {
        var nGrams,
            index;

        nGrams = [];

        if (value === null || value === undefined) {
            return nGrams;
        }

        value = String(value);

        index = value.length - n + 1;

        if (index < 1) {
            return nGrams;
        }

        while (index--) {
            nGrams[index] = value.substr(index, n);
        }

        return nGrams;
    };
}

/*
 * Export `n-gram`.
 */

module.exports = nGram;

/*
 * Create bigrams from a given value.
 *
 * @example
 *   bigram('n-gram')
 *   // ["n-", "-g", "gr", "ra", "am"]
 *
 * @param {*} value - The value to stringify and convert into bigrams.
 * @return {Array.<string>} bigrams
 */

nGram.bigram = nGram(2);

/*
 * Create trigrams from a given value.
 *
 * @example
 *   trigram('n-gram')
 *   // ["n-g", "-gr", "gra", "ram"]
 *
 * @param {*} value - The value to stringify and convert into trigrams.
 * @return {Array.<string>} trigrams
 */

nGram.trigram = nGram(3);

},{}],26:[function(require,module,exports){
'use strict';

var getTrigrams,
    EXPRESSION_SYMBOLS,
    has;

/**
 * Dependencies.
 */

getTrigrams = require('n-gram').trigram;

/**
 * Cache.
 */

has = Object.prototype.hasOwnProperty;

/**
 * An expression matching general non-important (as in, for
 * language detection) punctuation marks, symbols, and numbers.
 *
 * | Unicode | Character | Name               |
 * | ------: | :-------: | :----------------- |
 * |  \u0021 |     !     | EXCLAMATION MARK   |
 * |  \u0022 |     "     | QUOTATION MARK     |
 * |  \u0023 |     #     | NUMBER SIGN        |
 * |  \u0024 |     $     | DOLLAR SIGN        |
 * |  \u0025 |     %     | PERCENT SIGN       |
 * |  \u0026 |     &     | AMPERSAND          |
 * |  \u0027 |     '     | APOSTROPHE         |
 * |  \u0028 |     (     | LEFT PARENTHESIS   |
 * |  \u0029 |     )     | RIGHT PARENTHESIS  |
 * |  \u002A |     *     | ASTERISK           |
 * |  \u002B |     +     | PLUS SIGN          |
 * |  \u002C |     ,     | COMMA              |
 * |  \u002D |     -     | HYPHEN-MINUS       |
 * |  \u002E |     .     | FULL STOP          |
 * |  \u002F |     /     | SOLIDUS            |
 * |  \u0030 |     0     | DIGIT ZERO         |
 * |  \u0031 |     1     | DIGIT ONE          |
 * |  \u0032 |     2     | DIGIT TWO          |
 * |  \u0033 |     3     | DIGIT THREE        |
 * |  \u0034 |     4     | DIGIT FOUR         |
 * |  \u0035 |     5     | DIGIT FIVE         |
 * |  \u0036 |     6     | DIGIT SIX          |
 * |  \u0037 |     7     | DIGIT SEVEN        |
 * |  \u0038 |     8     | DIGIT EIGHT        |
 * |  \u0039 |     9     | DIGIT NINE         |
 * |  \u003A |     :     | COLON              |
 * |  \u003B |     ;     | SEMICOLON          |
 * |  \u003C |     <     | LESS-THAN SIGN     |
 * |  \u003D |     =     | EQUALS SIGN        |
 * |  \u003E |     >     | GREATER-THAN SIGN  |
 * |  \u003F |     ?     | QUESTION MARK      |
 * |  \u0040 |     @     | COMMERCIAL AT      |
 */

EXPRESSION_SYMBOLS = /[\u0021-\u0040]+/g;

/**
 * Clean `value`.
 *
 * @example
 *   > clean('Some dirty  text.')
 *   // 'some dirty text'
 *
 * @param {string} value
 * @return {string}
 */

function clean(value) {
    if (value === null || value === undefined) {
        value = '';
    }

    return String(value)
        .replace(EXPRESSION_SYMBOLS, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

/**
 * Deep regular sort on item at `1` in both `Object`s.
 *
 * @example
 *   > [[0, 20], [0, 1], [0, 5]].sort(sort);
 *   // [[0, 1], [0, 5], [0, 20]]
 *
 * @param {{1: number}} a
 * @param {{1: number}} b
 */

function sort(a, b) {
    return a[1] - b[1];
}

/**
 * Get clean, padded, trigrams.
 *
 * @param {string} value
 * @return {Array.<string>}
 */

function getCleanTrigrams(value) {
    return getTrigrams(' ' + clean(value) + ' ');
}

/**
 * Get an `Object` with trigrams as its attributes, and
 * their occurence count as their values
 *
 * @param {string} value
 * @return {Object.<string, number>} - `Object` containing
 *   weighted trigrams.
 */

function getCleanTrigramsAsDictionary(value) {
    var trigrams,
        dictionary,
        index,
        trigram;

    trigrams = getCleanTrigrams(value);
    dictionary = {};
    index = trigrams.length;

    while (index--) {
        trigram = trigrams[index];

        if (has.call(dictionary, trigram)) {
            dictionary[trigram]++;
        } else {
            dictionary[trigram] = 1;
        }
    }

    return dictionary;
}

/**
 * Get an `Array` containing trigram--count tuples from a
 * given value.
 *
 * @param {string} value
 * @return {Array.<Array.<string, number>>} `Array`
 *   containing trigram--count tupples, sorted by
 *   count (low to high).
 */

function getCleanTrigramsAsTuples(value) {
    var dictionary,
        tuples,
        trigram;

    dictionary = getCleanTrigramsAsDictionary(value);
    tuples = [];

    for (trigram in dictionary) {
        tuples.push([trigram, dictionary[trigram]]);
    }

    tuples.sort(sort);

    return tuples;
}

/**
 * Get an `Array` containing trigram--count tuples from a
 * given value.
 *
 * @param {Array.<Array.<string, number>>} tuples - Tuples
 *   to transform into a dictionary.
 * @return {Object.<string, number>}
 */

function getCleanTrigramTuplesAsDictionary(tuples) {
    var dictionary,
        index,
        tuple;

    dictionary = {};
    index = tuples.length;

    while (index--) {
        tuple = tuples[index];
        dictionary[tuple[0]] = tuple[1];
    }

    return dictionary;
}

/**
 * Expose utilities.
 */

module.exports = {
    'clean': clean,
    'trigrams': getCleanTrigrams,
    'asDictionary': getCleanTrigramsAsDictionary,
    'asTuples': getCleanTrigramsAsTuples,
    'tuplesAsDictionary': getCleanTrigramTuplesAsDictionary
};

},{"n-gram":25}],27:[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var deepClone, deepDelete, deepExtend, deepFromFlat, deepKeys, deepMapValues, isPlainObject, mapKeys, mapValues, _;

_ = require('underscore');

module.exports = {
  deepKeys: deepKeys = function(obj) {
    if (!isPlainObject(obj)) {
      throw new Error("deepKeys must be called on an object, not '" + obj + "'");
    }
    return _.flatten(_.map(obj, function(v, k) {
      if (isPlainObject(v) && !_.isEmpty(v)) {
        return _.map(deepKeys(v), function(subkey) {
          return "" + k + "." + subkey;
        });
      } else {
        return [k];
      }
    }));
  },
  deepClone: deepClone = function(object) {
    var type, _i, _len, _ref;
    if (object == null) {
      return object;
    }
    _ref = [Date, Number, String, Boolean];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      type = _ref[_i];
      if (object instanceof type) {
        return new type(object);
      }
    }
    if (_(object).isArray()) {
      return _(object).map(deepClone);
    }
    if (!_(object).isObject()) {
      return object;
    }
    if (object.nodeType && _(object.cloneNode).isFunction()) {
      return object.cloneNode(true);
    }
    if (object.constructor !== {}.constructor) {
      return object;
    }
    return mapValues(object, deepClone);
  },
  deepHas: function(obj, keys) {
    var helper;
    helper = function(obj, keys) {
      if ((keys.length === 0) || (!_.isObject(obj))) {
        return false;
      } else if (keys.length === 1) {
        return _.first(keys) in obj;
      } else {
        return helper(obj[_.first(keys)], _.rest(keys));
      }
    };
    return helper(obj, _.isArray(keys) ? keys : keys.split('.'));
  },
  deepOmit: function(obj, keys) {
    var deepOmitOne;
    if (!isPlainObject(obj)) {
      throw new Error("deepOmit must be called on an object, not '" + obj + "'");
    }
    deepOmitOne = function(obj, key) {
      var helper;
      helper = function(obj, key_arr) {
        switch (false) {
          case !_.isEmpty(key_arr):
            return obj;
          case key_arr.length !== 1:
            return _.omit(obj, _.first(key_arr));
          case !!isPlainObject(obj[_.first(key_arr)]):
            return obj;
          default:
            return _.extend({}, obj, _.object([_.first(key_arr)], [helper(obj[_.first(key_arr)], _.rest(key_arr))]));
        }
      };
      return helper(obj, key.split('.'));
    };
    return _.reduce(keys, deepOmitOne, obj);
  },
  deepPick: (function() {
    var deepGet;
    deepGet = function(obj, key) {
      var helper;
      helper = function(obj, key_arr) {
        if (key_arr.length === 1) {
          return obj != null ? obj[_.first(key_arr)] : void 0;
        } else {
          return helper(obj[_.first(key_arr)], _.rest(key_arr));
        }
      };
      return helper(obj, key.split('.'));
    };
    return function(obj, keys) {
      var flat_new_obj;
      if (!isPlainObject(obj)) {
        throw new Error("deepPick must be called on an object, not '" + obj + "'");
      }
      flat_new_obj = _.reduce(keys, function(new_obj, key) {
        var val;
        val = deepGet(obj, key);
        if (val !== void 0) {
          new_obj[key] = val;
        }
        return new_obj;
      }, {});
      return deepFromFlat(flat_new_obj);
    };
  })(),
  deepDelete: deepDelete = function(obj, key) {
    if ((key == null) || (obj == null)) {
      return;
    }
    if (!_(key).isArray()) {
      key = key.split('.');
    }
    if (key.length === 1) {
      delete obj[key];
      return;
    }
    return deepDelete(obj[key[0]], key.slice(1, key.length));
  },
  deepExtend: deepExtend = function(obj, ext, mutate) {
    return _.reduce(ext, function(acc, val, key) {
      acc[key] = (key in obj) && isPlainObject(obj[key]) && isPlainObject(val) ? deepExtend(obj[key], val) : val;
      return acc;
    }, mutate ? obj : _.clone(obj));
  },
  isPlainObject: isPlainObject = function(value) {
    return (value != null ? value.constructor : void 0) === {}.constructor;
  },
  deepToFlat: function(obj) {
    var recurse, res;
    res = {};
    recurse = function(obj, current) {
      var key, newKey, value, _results;
      _results = [];
      for (key in obj) {
        value = obj[key];
        newKey = (current ? current + "." + key : key);
        if (value && isPlainObject(value)) {
          _results.push(recurse(value, newKey));
        } else {
          _results.push(res[newKey] = value);
        }
      }
      return _results;
    };
    recurse(obj);
    return res;
  },
  deepFromFlat: deepFromFlat = function(o) {
    var k, key, oo, part, parts, t;
    oo = {};
    t = void 0;
    parts = void 0;
    part = void 0;
    for (k in o) {
      t = oo;
      parts = k.split(".");
      key = parts.pop();
      while (parts.length) {
        part = parts.shift();
        t = t[part] = t[part] || {};
      }
      t[key] = o[k];
    }
    return oo;
  },
  mapValues: mapValues = function(obj, f_val) {
    if (!isPlainObject(obj)) {
      throw new Error("mapValues must be called on an object, not '" + obj + "'");
    }
    return _.object(_.keys(obj), _.map(obj, f_val));
  },
  deepMapValues: deepMapValues = function(obj, f) {
    if (!isPlainObject(obj)) {
      throw new Error("deepMapValues must be called on an object, not '" + obj + "'");
    }
    return mapValues(obj, function(v, k) {
      if (isPlainObject(v)) {
        return deepMapValues(v, function(subv, subk) {
          return f(subv, "" + k + "." + subk);
        });
      } else {
        return f(v, k);
      }
    });
  },
  mapKeys: mapKeys = function(obj, f_val) {
    if (!isPlainObject(obj)) {
      throw new Error("mapKeys must be called on an object, not '" + obj + "'");
    }
    return _.object(_.map(obj, function(v, k) {
      return f_val(k, v);
    }), _.values(obj));
  }
};

},{"underscore":28}],28:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[1])