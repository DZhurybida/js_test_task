import 'isomorphic-fetch';
import { AUTHOR_URL, BOOK_URL } from '../actions'
export const LOAD_DATA = Symbol('Load Data');

const mjson = {
    "books": [
        {
            "name": "Brave new world",
            "authors": [{
                "name": "Aldous Huxley",
                "id": 1
            }],
            "short": "Winston works at the Ministry of Truth, or Minitrue, as an editor responsible for historical rev",
            "genre": "dystopia",
            "id": 1
        },
        {
            "name": "The Doors of Perception",
            "authors": [{
                "name": "Aldous Huxley",
                "id": 1
            }],
            "short": "Winston Smith lives in Airstrip One, the ruins of an England ravaged by war, civil conflict, and revolution",
            "genre": "others",
            "id": 2
        },
        {
            "name": "1984",
            "authors": [{
                "name": "George Orwell",
                "id": 2
            }],
            "genre": "dystopia",
            "short": "The story of Winston Smith begins on 4 April 1984: It was a bright cold day in April, and the clocks were striking thirteen yet he is uncertain of the true date, given the régime's continual rewriting and manipulation of history.[29] Smiths memories and his reading of the proscribed book",
            "id": 3
        },
        {
            "name" : "Vita Nostra",
            "authors": [{
                "name": "Sergey Dyachenko",
                "id": 3
            },{
                "name": "Marina Dyachenko",
                "id": 4
            }],
            "genre": "fantastic",
            "short": "The heroine of the novel has been forced into a seemingly inconceivable situation. Against her will, she must ent",
            "id": 4
        },
        {
            "name" : "The Campbell Plan",
            "authors": [{
                "name": "Thomas Campbell",
                "id": 5
            }],
            "genre": "action",
            "short": "In the 1980s, T. Colin Campbell, PhD, co-directed a study of more than 4 dozen diseases and 367 items of socio-economic, lifestyle, nutrition, and genetic information ",
            "id": 6
        }
    ],
    "authors": [
        {
            "name": "Aldous Huxley",
            "biography": "Nineteen Eighty-Four, sometimes published as 1984, is a dystopian novel by English author George Orwell published in 1949.[1][2] The novel is set in Airstrip One (formerly known as Great Britain), a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance and public manipulation",
            "id": 1,
            "books": [{"name": "Brave new world", "id": "1"},
                      {"name": "The Doors of Perception", "id": "2"}]
        },
        {
            "name": "George Orwell",
            "biography": "A writer is a person who uses written words in various styles and techniques to communicate ideas. Writers produce various forms of literary art and creative writing such as novels, short stories, poetry",
            "books": [{"name": "1984", "id": "3"}],
            "id": 2
        },
        {
            "name": "Sergey Dyachenko",
            "biography": "Writers can produce material across a number of genres, fictional or non-fictional. Other writers use multiple media – for example, graphics or illustration – to enhance the communication of their ideas",
            "books": [{"name": "Vita Nostra", "id": "4"}],
            "id": 3
        },
        {
            "name": "Marina Dyachenko",
            "biography": "Nineteen Eighty-Four, sometimes published as 1984, is a dystopian novel by English author George Orwell published in 1949.[1][2] The novel is set in Airstrip One (formerly known as Great Britain), a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance and public manipulation",
            "books": [{"name": "Vita Nostra", "id": "5"}],
            "id": 4
        },
        {
            "name": "Thomas Campbell",
            "biography": "As well as producing their own written works, writers often write on how they write (that is, the process they use);[3] why they write (that is, their motivation);[4] and also comment on the work of other wc manipulation",
            "books": [{"name": "The Campbell Plan", "id": "6"}],
            "id": 5
        }
    ]
}

function myfetch(url){
  let data = [];
  let message = '';
  switch(url){
  case BOOK_URL:
    data = [...mjson.books];
    break;
  case AUTHOR_URL:
    data = [...mjson.authors];
    break;
  default:
    message = 'URL not found';
  }

  let result = {};
  if (message)
  result = {
    then(succesHandler){
    return this;
    },
    err(errHandler){
    errHandler(message);
    }
  }
  else
  result = {
      then(succesHandler){
    succesHandler(data);
    return this;
    },
    err(errHandler){
    return this;
    }
  }

  return result;
}

export default store => next => action => {

  const loadData = action[LOAD_DATA];

  if (typeof loadData === 'undefined') {
    return next(action);
  }

  const { fullUrl, types } = loadData;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[LOAD_DATA];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));
  myfetch(fullUrl)
    .then(json => {
    next(actionWith({type:successType, data:json}));
    })
  .err(error => {
    next(actionWith({type:failureType, message:error}));
  })
};