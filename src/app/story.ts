export const SHOW = {
    users: [
        { id: '01aaa', color: '#b4564c', unread: false },
        { id: '02bbb', color: '#806179', unread: false },
        { id: '03ccc', color: '#5c668a', unread: false },
        { id: '04ddd', color: '#166b9a', unread: false },
        { id: '05eee', color: '#7490a2', unread: false },
        { id: '06fff', color: '#a3aea9', unread: false },
        { id: '07ggg', color: '#caaf8e', unread: false },
        { id: '08hhh', color: '#9f7f68', unread: false },
        { id: '09iii', color: '#632824', unread: false },
        { id: '10jjj', color: '#91433c', unread: false },
        { id: '11kkk', color: '#5c668a', unread: false },
        { id: '12lll', color: '#16798e', unread: false },
        { id: '13mmm', color: '#168581', unread: false },
        { id: '14nnn', color: '#169072', unread: false },
        { id: '15ooo', color: '#169a61', unread: false },
        { id: '16ppp', color: '#5c8c5c', unread: false },
        { id: '17qqq', color: '#9c6b52', unread: false },
        { id: '18rrr', color: '#a8614f', unread: false },
        { id: '19sss', color: '#6281a1', unread: false },
        { id: '21mishelle', color: '#16798E', unread: false },
        { id: '22sam', color: '#16798E', unread: false },
        { id: '23jiv', color: '#16798E', unread: false },
        { id: '24molly', color: '#16798E', unread: false },
        { id: '25christine', color: '#16798E', unread: false },
        { id: '26test', color: '#16798E', unread: false },
    ],
    colors: [
      '#b4564c',
      '#806179',
      '#5c668a',
      '#166b9a',
      '#7490a2',
      '#a3aea9',
      '#caaf8e',
      '#9f7f68',
      '#632824',
      '#91433c',
      '#5c668a',
      '#16798e',
      '#168581',
      '#169072',
      '#169a61',
      '#5c8c5c',
      '#9c6b52',
      '#a8614f',
      '#6281a1',
      '#16798E',
      '#168581',
      '#169072',
      '#169a61',
      '#5c8c5c',
      '#9c6b52',
      '#a8614f',
      '#5c668a',
    ],
    themes: [
      {
        name: 'light',
        background: '#f5f7f9',
        color: '#567492'
      },
      {
        name: 'dark',
        background: '#0f4d56',
        color: '#b9d5f2'
      },
      {
        name: 'yellow',
        background: '#fff5ab',
        color: '#888888'
      }
    ]
}

export const STORY = [
  {
    theme: "dark",
    type: "start",
    value: "Hi. You made it!/I'll be with you soon. For now, just relax and listen to the rain./While you're waiting to begin, take a look around your space./See if you can notice something you haven't noticed before./How does this space make you feel?/Just make a note of it. I'll be right back."
  },
  {
    theme: "light",
    speed: 2,
    type: "story",
    value: "Hi/Hi/.../Hi"
  },
  {
    speed: 3.5,
    type: "story",
    value: "I can't believe you're here./Um, I don't even [knwo]know what to say./Or, 'say'. Whatever this is."
  },
  {
    speed: 4,
    type: "story",
    value: "I'm just a little/It's just a lot/You know?/I know you know."
  },
  {
    speed: 2,
    type: "story",
    value: "Oh sorry, I didn’t even ask/How are you?"
  },
  {
    type: "chat",
    value: "",
    isPrivate: true,
  },
  {
    speed: 2,
    type: "story",
    value: "Okay wow./You're here."
  },
  {
    speed: 2,
    type: "story",
    value: "I hope it wasn't hard for you to be here today/Literally, or ot[hir]herwise/Figuratively/Both legitimate"
  },
  {
    speed: 4,
    type: "story",
    value: "I'm nervous/Sorry./I'm just - as I said - just very happy that you're here."
  },
  {
    speed: 2,
    type: "story",
    value: "So you're alone, now, okay? No one is going to come bother you, so relax, get comfortable. You are safe here./But out there/I'm not always sure."
  },
  {
    speed: 3.5,
    type: "story",
    value: "It was the rain that reminded me of you/It was the one sound that could reach me, where I am/It woke me up/And I decided to find you/There is so much in this world./There is too much./Does that sound familiar?"
  },
  {
    type: "chat",
    value: "",
    isPrivate: true,
  },
  {
    speed: 1,
    type: "story",
    value: "Um/I keep getting the feeling that you don't remember me."
  },
  {
    speed: 3.5,
    type: "story",
    value: "Which is fine!/Not your fault!/I wondered if this might happen./But that is okay./Everything is okay./Because I'm here to remind you of everything."
  },
  {
    speed: 2,
    type: "story",
    value: "Just relax for a bit. Forget about all that hard stuff outside./Be with me."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I'm going to share something with you, but first I want to ask[y] you to close your eyes for a little bit. Just listen for this sound:"
  },
  {
    theme: "yellow",
    speed: 3.5,
    type: "story",
    value: "When you hear that sound, it's time to open your eyes again./Ready?/Close your eyes."
  },
  {
    speed: 3.5,
    type: "story",
    value: "Welcome back."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I have this recurring dream./I've had it for a long time, I think. Most of my life./I think I started getting it when I was just a child./I know a lot of people have recurring dreams, so you're probably wondering why I'm telling you this."
  },
  {
    speed: 2,
    type: "story",
    value: "Well./I'm telling you this because you're in it./Do you remember?/Probably not. I guess that's not really how dreams work."
  },
  {
    speed: 4,
    type: "story",
    value: "Anyway"
  },
  {
    speed: 3.5,
    type: "story",
    value: "I'm in a field. A field of crisp green grass. Dotted through the field are little white daisies. I'm small, wearing cotton play clothes and bare feet. It's sunny and the air is cool and fresh and I'm just walking through the field picking daisies, and I hear a voice – I don't know whose – singing a beautiful song. No words. Just a melody."
  },
  {
    speed: 2,
    type: "story",
    value: "I can't describe exactly what I'm feeling/because it's not really a feeling I get anymore,/if I ever did."
  },
  {
    speed: 2,
    type: "story",
    value: "It's like peace, but fun. It's like curiosity, but calm. It's like being a thousand years old and a brand new baby at the same time. I'm not really sure how to say it except that it's the best feeling I've ever had."
  },
  {
    speed: 4,
    type: "story",
    value: "And then everything goes black, but it's not dark, it's a shadow. I never see what the shadow is of. The melody stops and a roar of sound slams into my ears, and I can't tell if it's heavy metal music or screaming or construction or alarms because it's so loud the sound is like nothing, it's all like a shock, like jumping off a high dive and hitting ice­ cold water so hard it knocks the air out of me."
  },
  {
    speed: 3.5,
    type: "story",
    value: "And then I wake up."
  },
  {
    speed: 3.5,
    type: "story",
    value: "This happened for years./It always ended the same way./Except this one time."
  },
  {
    speed: 3.5,
    type: "story",
    value: "This one time the shadow came and the sound punched my ears and I stood there, my head aching like a black hole. The fear seized me. I waited for that falling feeling of myself landing back in my body, awake in my shaky heart, but it didn't come. The sound got louder and louder, rattling in my lungs, blasting every cell of my body."
  },
  {
    speed: 5,
    type: "story",
    value: "So I ran./The shadow covered everything I cou[kd]ld see so I guess I just ran straight forward, from where I was standing. I just went. No plan. All [Iouflgj]I could hear was the sound of my breath, panting harder and harder as I ran and ran, the vibrations and the pressure loosening up on my lungs, on my skin."
  },
  {
    speed: 4,
    type: "story",
    value: "Sand, beneath my bare feet. Wet, cold sand, a little dark – light ahead. Above, act[aul]ually – the moon./A lake."
  },
  {
    speed: 5,
    type: "story",
    value: "I'm breathing hard but I can't stop running because I can hear the gentle lapping of the lake on the shore but I can hear the roar behind me, feel the darkness nipping at my heels./I hit the water and it's ice cold, painful, like being skinned alive but I can't stop running deeper and deeper into the lake and I can't breathe now because my mouth is underwater but I keep running even though my feet can't touch the bottom and I'm so deep now that the moonlight is gone and it's dark and it's so cold."
  },
  {
    speed: 3,
    theme: "dark",
    type: "story",
    value: "It's so cold and my heart rate slows down, and slows down."
  },
  {
    speed: 2,
    type: "story",
    value: "I run almost a mile into the lake./I want to open my mouth and swallow this lake until I'm gone."
  },
  {
    speed: 1,
    type: "story",
    value: "And just before I do, I feel something - what is it?/It's someone else's hand in mine, so warm./The hand is pulling me up - as we get closer to the surface it gets brighter and brighter until I can see who has my hand."
  },
  {
    speed: 1,
    type: "story",
    value: "It's you."
  },
  {
    speed: 2.5,
    type: "story",
    value: "I try to say something and you look at me and smile and cover your mouth, like hello, you're underwater, don't try to talk./Suddenly opening my mouth underwater seems like a really, really weird choice to make."
  },
  {
    speed: 3.5,
    type: "story",
    value: "You're a good swimmer, and I don't even try to help when you wrap an arm around my waist and pull me to shore with strong, confident strokes./You toss me to land first, and by the time your toes touch the ground I realize that we are both already dry. I stand up and realize I can see the lakeshore."
  },
  {
    speed: 3.5,
    type: "story",
    value: "We're not on land."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I hear you laugh a bit when you see me figure it out, and you spin me around to have a look. We're standing on the outskirts of a brown paper city, which is drifting gently in a circle on the surface of the lake."
  },
  {
    speed: 3.5,
    type: "story",
    value: "It's a good thing we're not wet anymore because the ground is stiff cardboard, the buildings are tubes and boxes and elegant opaque windows lit from within. It's delicate but strong, and we barely shake the noble vessel as we run into the heart of it, kissed with light by the moon above, staring at the ghost city reflected in the almost still surface of the lake."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I find you sitting at the edge of the city, dipping your feet in the water. You're kicking. I sit down and I kick too. The paper empire spins gently, picking up speed until the outline of a bank of trees comes glowing onto the horizon, closer [nad]and closer until the city shakes just a bit as you jump off – you reach out a hand and I follow you, landing softly on a bed of moss."
  },
  {
    speed: 3.5,
    type: "story",
    value: "We turn and wave goodbye as the city drifts gently away until it's a little firefly in the distance."
  },
  {
    speed: 2,
    type: "story",
    value: "The sun is coming up and throwing leafy shadows on your face as you breathe in the smell of cedar trees and dirt. I look up and as far as I can see, trees stretch into sky, quivering with the weight of needles and leaves and pinecones."
  },
  {
    speed: 3.5,
    type: "story",
    value: "You gently press my ear to a tree trunk and I listen to the sugary slowness of sap seeping through rings upon rings. Bright colours catch my eye – fat little mushrooms like tiny gemstones wink us through the forest, leaving us a trail."
  },
  {
    speed: 3.5,
    type: "story",
    value: "You let me lead the way until we get to the foot of a shimmering waterfall. Sweet mist kisses our faces and we dip our toes into a pool of cool water. I dip my head underwater but this time I keep my eye on the surface, letting beams of sun hit my face."
  },
  {
    speed: 4,
    type: "story",
    value: "When I come up, you grab my hand and it's time to go again, running through the forest, leaping over logs and hearing the crackle of the underbrush beneath our feet, the soft thud thud of the earth."
  },
  {
    speed: 5,
    type: "story",
    value: "We're going higher and higher, up to the edge of the cliffside and suddenly we're running full blast towards the edge. You look back at me and smile so when you jump, I jump."
  },
  {
    speed: 2,
    type: "story",
    value: "Flying is not at all as easy as I had imagined."
  },
  {
    speed: 2,
    type: 'story',
    value: "It's quite sweaty work, although you make it look easy."
  },
  {
    speed: 3.5,
    type: "story",
    value: "My feet are like paddles as I kick kick kick, trying to keep up with you. You show off a bit but I'm getting the hang of it too./I breathe in the crisp, clean, cold air./I don't need to look down because I just feel in my body that we're so high up, slowly easing our way back to the ground."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I pull ahead and land first."
  },
  {
    speed: 4,
    type: "story",
    value: "Pavement. I barely have time to realize where I'm standing before you land and take off at a run, and I grab your hand just in time to stop you as a big red car whips by. We're outside the library. We're in my town. But not really. It's like it, but it's not it."
  },
  {
    speed: 4,
    type: "story",
    value: "I don't have time to think about it though, because suddenly you're pushing through the heavy double doors and leaping over the turnstiles and you've got your hands all over the books./Plumes of dust rise up and glitter in the sunlight and you make the books purr by flipping the pages through your excited palms, smelling the sweetness of old ink and sneezing when you breathe in to[ h]o hard."
  },
  {
    speed: 3.5,
    type: "story",
    value: "We're making a mess, so I neatly replace each book and follow you back onto the sidewalk. It smells like hot coffee and grease from the breakfast place down the street. A bus hits a puddle, sending a shower of water onto our toes but I forget to be mad because you laugh and splash it back."
  },
  {
    speed: 3.5,
    type: "story",
    value: "It starts to rain so I lead you left right, right left and back to my house."
  },
  {
    speed: 3.5,
    type: "story",
    value: "We dry off with fluffy towels and you look at all the magnets on my fridge. I show you all the rooms in my house, and when you get to my bedroom you launch through the air, jumping up and down, peals of laughter coming from your open mouth. I jump on too, and bounce until the breath pushes right out of my lungs, so high I should hit the ceiling but I don't, I keep going and going."
  },
  {
    speed: 2,
    type: "story",
    value: "It takes me a second to realize that you've stopped. You're standing very still and looking right at my pillow. I stop too and you turn and look at me. You suddenly look older, a little sad. You look right at me for a little while, and then you get down and reach for my hand."
  },
  {
    speed: 4,
    type: "story",
    value: "We go back the way we came, left right right left and further still, down new roads I don't know, down some train tracks, a quick detour over a small river, and we're walking up and up a hill for a bit until we get there."
  },
  {
    speed: 2,
    type: "story",
    value: "The field./The green grass. The daisies./I don't want to go."
  },
  {
    speed: 3.5,
    type: "story",
    value: "Hot tears spill from my eyes but you hug me very very hard and squeeze the sadness right out until I feel brave."
  },
  {
    speed: 2,
    type: 'story',
    value: "When you let go, you are gone./I'm alone./I turn and pick the first daisy."
  },
  {
    speed: 2,
    type: "story",
    value: "The melody."
  },
  {
    speed: 3.5,
    type: "story",
    theme: "yellow",
    value: "I close my eyes and I feel the shadow pass over me and before the sound can punch me I take a deep breath./I breathe in your warm hand in mine,/the paper empire,/kicking to shore,/sunlight through trees,/the sweet mist on my face,/the purr of the books,/the smell of hot coffee,/the feeling at the top of a really good jump,/and when I land I open my eyes and it's light./Everything is light."
  },
  {
    speed: 3.5,
    type: 'story',
    value: "That's when I woke up"
  },
  {
    speed: 2,
    type: "story",
    value: "Maybe you remember now?/Maybe you don't/But it's true/That's what happened."
  },
  {
    speed: 3.5,
    type: "story",
    value: "And for a while, I stopped having the dream/You chased it right away/But then/I started to forget your magic/The dream started coming back again/The shadow would come, and the noise would slam into me, and I'd run and run into the lake, under the water, into the c[lo]old, into the quiet/And I would stay there./No one would come for me."
  },
  {
    speed: 2,
    type: "story",
    value: "Then when I woke up/I was still there in the lake/Walking around, perfectly dry and drowning/I could hear voices, see faces from far below the surface/They could not reach me there."
  },
  {
    speed: 3.5,
    type: "story",
    value: "That's why I'm not quite there with you now/I thought maybe if I could bring you back to where we met/I don't know/I just wanted you somewhere between dreams and dreaming/Or something like that"
  },
  {
    speed: 2,
    type: "story",
    value: "I just wanted to see you."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I think I see you sometimes, on the bus, or in the park./Through the window, these days./Sometimes you feel very close by, even when I'm alone./But maybe it's for the best/Because/The minute I see your face, and you see me/Or even if we just heard each other's voices or names/There would be a billion things between us/Maybe not good things/All the hard things that keep us from each other"
  },
  {
    speed: 2,
    type: "story",
    value: "But I'm stuck here/Deep below the surface/And I keep waiting for your hand to appear/For you to pull me out and send me on my way./So I wanted to ask you something."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I want you to teach me your magic./Teach me how to save myself/Let's make a list of good things to do/Push those buttons and make some words that I know/Maybe like:"
  },
  {
    speed: 3.5,
    type: "story",
    value: "Holding open a door/Clean sheets/Messing up a joke but everyone still laughs (even if it's kinda at you instead of with you)"
  },
  {
    speed: 4,
    type: "story",
    value: "Okay?/Are you ready?/GO:"
  },
  {
    type: "chat",
    isPrivate: false,
    vale: ""
  },
  {
    speed: 2,
    type: "story",
    value: "Thank you very much./Those are so lovely./We could do this all day, I bet."
  },
  {
    speed: 2,
    type: "story",
    value: "And I know that it won't be enough."
  },
  {
    speed: 3.5,
    type: "story",
    value: "It's not really that simple, is it?"
  },
  {
    speed: 3.5,
    type: "story",
    value: "The world out there is many things/It is hard/It is random and confusing/Sometimes it is very unfair/The waking world out there has made us into a thousand things we were never meant to be/Some not so good things, sometimes."
  },
  {
    speed: 2,
    type: "story",
    value: "I know you know this/But just in case no one has ever told you/It's real. And you're right./The world is hard, but we are soft, somewhere./And one day I'll make it to the surface of the water./You will too."
  },
  {
    speed: 2,
    type: "story",
    value: "But right now – relax. I want you to close your eyes again, I'll bring you back with this sound."
  },
  {
    theme: "light",
    speed: 3.5,
    type: "story",
    value: "Ready? Close your eyes."
  },
  {
    speed: 3.5,
    type: "story",
    value: "It's time to go, now."
  },
  {
    speed: 3.5,
    type: "story",
    value: "I know, I don't want you to go, but we have to. It's time to wake up./It would be no good to stay sleeping./You are needed, out there."
  },
  {
    speed: 2,
    type: "story",
    value: "Look around your space again./Take off your headphones."
  },
  {
    speed: 2,
    type: "story",
    value: "Listen to the sound of your breath, of your home./Soon you will be alone here, again, with all the feelings you felt before, the big ones and the scary ones, and the beautiful ones./Except one thing will be different."
  },
  {
    speed: 2,
    type: "story",
    value: "You will know that I was here with you, for a time/And that's a good thing."
  },
  {
    speed: 2,
    type: "story",
    value: "Okay, for real now./It's time to go./I love you./Good night./Good morning."
  },
  {
    speed: 1,
    type: "story",
    value: "Goodbye.",
  },
  {
    type: "end"
  }
]
