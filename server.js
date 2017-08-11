const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials'); //ezeket lehet includolni
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  //minden kérést logolunk
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err){
      console.log('nem sikerült logolni');
    }
  });

  next();
});//middleware, csak next-nél folytatja

/*app.use((req, res, next)=>{
  res.render('maintenance.hbs', {
    pageTitle: 'Karbantartás'
  });

});*/
app.use(express.static(__dirname+'/public'));
//__dirname projekt mappája

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
}); //minden template-ben elérhető lesz

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name: 'Andrew',
    likes: [
      'Biking',
      'Hiking'
    ]
  });*/
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello!!'
  });
}); //handler for http requests

app.get('/about', (req, res)=>{
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Probléma'
  });
});

app.listen(port, ()=>{
  console.log('Server started');
});
