const albums = {

    album1:[
        'https://yeirkdajtottveglhqdf.supabase.co/storage/v1/object/public/Wedding%20Photos/Album1/DSC_3451.JPG'
    ],

    album2:[
        "images/a2.jpg",
        "images/a3.jpg"
    ],

    album3:[
        "images/a3.jpg",
        "images/a4.jpg"
    ],

    album4:[
        "images/a4.jpg",
        "images/a1.jpg"
    ],

    liked:[]
};

let currentAlbum = [];
let currentIndex = 0;

/* START */

function startGallery(){

    document.getElementById("welcome")
    .style.display="none";

    document.getElementById("mainPage")
    .style.display="block";

    createBackground();

}

/* OPEN ALBUM */

function openAlbum(name){

    document.getElementById("mainPage")
    .style.display="none";

    document.getElementById("galleryPage")
    .style.display="block";

    const gallery =
    document.getElementById("gallery");

    gallery.innerHTML="";

    currentAlbum = albums[name];

    currentAlbum.forEach((photo,index)=>{

        gallery.innerHTML += `

        <div class="photo-box">

            <img src="${photo}"
            onclick="openViewer(${index})">

        </div>

        `;

    });

}

/* HOME */

function goHome(){

    document.getElementById("galleryPage")
    .style.display="none";

    document.getElementById("mainPage")
    .style.display="block";

}

/* VIEWER */

function openViewer(index){

    currentIndex=index;

    document.getElementById("viewer")
    .style.display="flex";

    document.getElementById("viewerImg")
    .src=currentAlbum[currentIndex];

}

function closeViewer(){

    document.getElementById("viewer")
    .style.display="none";

}

/* NEXT */

function nextPhoto(){

    currentIndex++;

    if(currentIndex>=currentAlbum.length){

        currentIndex=0;

    }

    document.getElementById("viewerImg")
    .src=currentAlbum[currentIndex];

}

/* PREVIOUS */

function prevPhoto(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=currentAlbum.length-1;

    }

    document.getElementById("viewerImg")
    .src=currentAlbum[currentIndex];

}

/* LIKE */

function likePhoto(){

    const photo =
    currentAlbum[currentIndex];

    if(!albums.liked.includes(photo)){

        albums.liked.push(photo);

        alert("Added to Liked");

    }

}

/* DOWNLOAD */

function downloadPhoto(){

    const a =
    document.createElement("a");

    a.href=currentAlbum[currentIndex];

    a.download="photo";

    a.click();

}

/* BACKGROUND */

function createBackground(){

    const canvas =
    document.getElementById("bg");

    const ctx =
    canvas.getContext("2d");

    canvas.width=
    window.innerWidth;

    canvas.height=
    window.innerHeight;

    const points=[];

    for(let i=0;i<80;i++){

        points.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            vx:(Math.random()-0.5),

            vy:(Math.random()-0.5)

        });

    }

    function animate(){

        ctx.clearRect(
            0,0,
            canvas.width,
            canvas.height
        );

        for(let i of points){

            i.x+=i.vx;
            i.y+=i.vy;

            if(i.x<0 || i.x>canvas.width)
            i.vx*=-1;

            if(i.y<0 || i.y>canvas.height)
            i.vy*=-1;

            ctx.beginPath();

            ctx.arc(i.x,i.y,2,0,6.28);

            ctx.fillStyle="silver";

            ctx.fill();

        }

        for(let a of points){

            for(let b of points){

                let dx=a.x-b.x;
                let dy=a.y-b.y;

                let dist=
                Math.sqrt(dx*dx+dy*dy);

                if(dist<140){

                    ctx.beginPath();

                    ctx.moveTo(a.x,a.y);

                    ctx.lineTo(b.x,b.y);

                    ctx.strokeStyle=
                    "rgba(192,192,192,0.15)";

                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(animate);

    }

    animate();

}
