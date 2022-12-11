var sessionString = sessionStorage.getItem('unsortedarray');
var array = JSON.parse(sessionString);
/////////////////////////////////////////////////////////////////////////////////////////
//#60e368
//show count array in counting sort


var heightfactor = 400/Math.max.apply(Math,array);
function displaybars()
{
    var arr = array;
    var n = arr.length;
    var i;
    var container = document.getElementById("container");
    container.style.width = (n * 30) + "px";
    for (i = 0; i < n; i++)
    {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${arr[i]*heightfactor}px`;
        bar.style.transform = `translate(${i * 30}px)`;
        var bar_label = document.createElement("label");
        bar_label.classList.add("bar_id");
        bar_label.innerText = arr[i];

        bar.appendChild(bar_label);
        container.appendChild(bar);
    }
}


//Insertion Sort θ(n^2)
async function insertionsort()
{
    document.getElementById("insertionbtn").style.display = 'none';
    var arr = array;
    var n = arr.length;
    var i, j, temp, height;
    let bars = document.getElementsByClassName("bar");
    bars[0].style.backgroundColor = "#60e368";

    for(i = 1; i < n; i++)
    {
        height = bars[i].style.height;
        temp = arr[i];
        bars[i].style.backgroundColor = "yellow";
        j=i-1;

        await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 250)
        );
        
        while(j>=0 && arr[j]>temp)
        {
            bars[j].style.backgroundColor = "yellow";

            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;

            arr[j + 1] = arr[j];
            j--;

            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 250)
            );

            for(var k=i;k>=0;k--)
                bars[k].style.backgroundColor = "#60e368";
            
        }
        arr[j+1] = temp;
        bars[j + 1].style.height = height;
        bars[j + 1].childNodes[0].innerHTML = temp;

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 250)
        );
        bars[i].style.backgroundColor = "#60e368";
    }

    document.getElementById("time").innerText = "Time Complexity θ(n^2): (" + n + "^" + 2 +") = " + (n*n) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(1): " + 1;
}


//Bubble sort θ(n^2)
async function bubblesort()
{
    document.getElementById("bubblebtn").style.display = 'none';
    var arr = array;
    var n = arr.length;
    var i, j;

    let bars = document.getElementsByClassName("bar");
    
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n-i-1; j++)
        {
            //comparing bars
            bars[j].style.backgroundColor = "red";
            bars[j+1].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(()=> {
                    resolve();

                }, 250));
            
            var val1 = Number(bars[j].childNodes[0].innerHTML);
            var val2 = Number(bars[j+1].childNodes[0].innerHTML);
            if (val1 > val2)
            {
                await bubbleswapbars(bars[j],bars[j+1]);
                bars = document.getElementsByClassName("bar");
            }
            bars[j].style.backgroundColor = "cyan";
            bars[j+1].style.backgroundColor = "cyan";
        }
        bars[bars.length-i-1].style.backgroundColor = "#60e368";
    
    }
    document.getElementById("time").innerText = "Time Complexity θ(n^2): (" + n + "^" + 2 +") = " + (n*n) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(1): 1";
}
function bubbleswapbars(v1,v2){
    return new Promise((resolve) => {
        var temp = v1.style.transform;
        v1.style.transform = v2.style.transform;
        v2.style.transform = temp;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                container.insertBefore(v2, v1);
                resolve();
            }, 50);
        });
    });
}


//Merge Sort θ(nlog(n))
async function callmerge()
{
    document.getElementById("mergebtn").style.display = 'none';
    var arr = array;
    var n = arr.length;
    let bars = document.getElementsByClassName("bar");
    await mergesort(arr, 0, n-1,bars);

    document.getElementById("time").innerText = "Time Complexity θ(nlog(n)): (" + n + "*log(" + n +")) = " + Math.ceil((n*Math.log2(n))) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(n): " + n;
}
async function mergesort(arr, l, r,bars)
{
    if(l<r)
    {
        var m = Math.floor((l+r)/2);
        var res;
        res = await mergesort(arr,l,m,bars);
        res = await mergesort(arr,m+1,r,bars);
        res = await merge(arr,l,m,r,bars);
    }
}
async function merge(arr, l, m, r,bars)
{
    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );
    var i,j;
    var n1 = m - l + 1;
    var n2 = r - m;
 
    var L = [];
    var R = [];
    
    for (i = 0; i < n1; i++)
    {
        L.push(arr[l+i]);
        bars[l+i].style.backgroundColor = "gold";
    }
    for (j = 0; j < n2; j++)
    {
        R.push(arr[m+j+1]);
        bars[m+j+1].style.backgroundColor = "orangered";
    }

    L.push(Infinity);
    R.push(Infinity);

    i = 0;
    j = 0;
    for(var k = l; k <= r; k++)
    {
        await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );
        if(L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }

        // bars[k].childNodes[0].innerHTML = arr[k];
        bars[k].style.backgroundColor = "blueviolet";
    }

    for(k=l;k<=r;k++)
    {
        bars[k].childNodes[0].innerHTML = arr[k];
        bars[k].style.height = (arr[k]*heightfactor) + "px";
    }

    await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );
    
    if(l == 0 && r == arr.length - 1)
    {
        for(i = l; i <= r; i++)
        {
            bars[i].style.backgroundColor = "mediumspringgreen";
        }
    }
    else
    {
        for(i = l; i <= r; i++)
        {
            bars[i].style.backgroundColor = "#60e368";
        }
    }
}


//Heap Sort θ(nlog(n))
async function heapsort()
{
    document.getElementById("heapbtn").style.display = 'none';
    var arr = array;
    var n = arr.length;
    var i, val;
    let bars = document.getElementsByClassName("bar");

    for (i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(arr, n, i);

    for (i = n - 1; i >= 0; i--)
    {
        var height = bars[i].style.height;
        var temp = bars[i].childNodes[0].innerText;
        bars[0].style.backgroundColor = "red";

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400)
        );

        bars[i].style.height = bars[0].style.height;
        bars[0].style.height = height;
        bars[i].childNodes[0].innerText = bars[0].childNodes[0].innerText;
        bars[0].childNodes[0].innerText = temp;
        bars[0].style.backgroundColor = "cyan";
        bars[i].style.backgroundColor = "#60e368";
        

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 250)
        );

        val = arr[0];
        arr[0] = arr[i];
        arr[i] = val;

        await heapify(arr, i, 0);
    }
    
    document.getElementById("time").innerText = "Time Complexity θ(nlog(n)): (" + n + "*log(" + n +")) = " + Math.ceil((n*Math.log2(n))) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(1): 1";
}
async function heapify(arr, N, i)
{
    var bars = document.getElementsByClassName("bar");
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    for(var k=0;k<N;k++)
        bars[k].style.backgroundColor = "cyan";
    
    if (l < N && arr[l] > arr[largest])
        largest = l;

    if (r < N && arr[r] > arr[largest])
        largest = r;

    if (largest != i)
    {
        bars[i].style.backgroundColor = "red";
        bars[largest].style.backgroundColor = "red";

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 250)
        );

        var height = bars[i].style.height;
        bars[i].style.height = bars[largest].style.height;
        bars[largest].style.height = height;

        var temp = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = bars[largest].childNodes[0].innerText;
        bars[largest].childNodes[0].innerText = temp;

        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        await heapify(arr, N, largest);

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 250)
        );
    }
}


//Quick Sort θ(nlog(n))
async function callquick()
{
    document.getElementById("quickbtn").style.display = 'none';
    var arr = array;
    var n = arr.length;

    await quicksort(arr, 0, n-1);
    
    document.getElementById("time").innerText = "Time Complexity θ(nlog(n)): (" + n + "*log(" + n +")) = " + Math.ceil((n*Math.log2(n))) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(n): " + n;
}
async function quicksort(arr, low, high)
{
    let bars = document.getElementsByClassName("bar");
    if(low < high)
    {
        var pi = await partition(arr, low, high);

        await quicksort(arr, low, pi - 1);

        for(var j=low;j<=pi+1;j++)
            bars[j].style.backgroundColor = "#60e368";

        await quicksort(arr, pi + 1, high);
        
        for(var j=low;j<=high;j++)
            bars[j].style.backgroundColor = "#60e368";
    }
}
async function partition(arr, low, high)
{
    let bars = document.getElementsByClassName("bar");
    var pivot = arr[high];
    bars[high].style.backgroundColor = "red";
    var i = low - 1;
    var val, height, label;

    for (var j = low; j <= high - 1; j++)
    {
        bars[j].style.backgroundColor = "blueviolet";

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));
        
        if (arr[j] < pivot)
        {
            i++;

            height = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = height;

            label = bars[i].childNodes[0].innerText;
            bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            bars[j].childNodes[0].innerText = label;

            val = arr[i];
            arr[i] = arr[j];
            arr[j] = val;

            bars[i].style.backgroundColor = "chartreuse";
            if(i!=j)
                bars[j].style.backgroundColor = "chocolate";

            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 400));
        }
        else
            bars[j].style.backgroundColor = "chocolate";
    }

    i++;
    val = arr[i];
    arr[i] = arr[high];
    arr[high] = val;

    height = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = height;

    label = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = bars[high].childNodes[0].innerText;
    bars[high].childNodes[0].innerText = label;

    bars[i].style.backgroundColor = "red";
    bars[high].style.backgroundColor = "chocolate";

    await new Promise((resolve) =>
    setTimeout(() => {
        resolve();
    }, 2000));

    for(var k=0;k<=high;k++)
        bars[k].style.backgroundColor = "cyan";
    
    return i;
}


//Radix Sort θ(nd)
async function radixsort()
{
    document.getElementById("radixbtn").style.display = 'none';
    let textdisplay = document.getElementById("exponential");
    textdisplay.style.marginTop = "20px";
    var arr = array;
    var n = arr.length;
    var bars = document.getElementsByClassName("bar");
    var res, d=0;
    var max = Math.max.apply(Math,arr);
    var min = Math.min.apply(Math,arr);
    for(var exp=1; Math.floor(max/exp) > 0; exp*=10)
    {
        d++;
        textdisplay.innerHTML = "Sorting on " + exp + "s";
        res = await radixcount(arr, exp);
    }
    textdisplay.innerHTML = "";
    for(var i=0;i<arr.length;i++)
        bars[i].style.backgroundColor = "#60e368";
    
    document.getElementById("time").innerText = "Time Complexity θ(nd): (" + n + "*" + d +") = " + n*d + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(n+b): (" + n + "+" + 10 + ") = " + (n + 10);
}
async function radixcount(arr,exp)
{
    let bars = document.getElementsByClassName("bar");
    var i, length = arr.length;
    let output = new Array(length);
    let height = new Array(length);
    let label = new Array(length);
    let count = new Array(10);
    for(i=0;i<10;i++)
    {
        count[i]=0;
    }

    for (i = 0; i < length; i++)
    {
        bars[i].style.backgroundColor = "red";
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 300));
        count[Math.floor(arr[i] / exp) % 10]++;
        bars[i].style.backgroundColor = "cyan";
    }

    for (i = 1; i < 10; i++)
    {
        count[i] += count[i - 1];
    }

    for (i = length - 1; i >= 0; i--)
    {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        height[count[Math.floor(arr[i] / exp) % 10] - 1] = bars[i].style.height;
        label[count[Math.floor(arr[i] / exp) % 10] - 1] = bars[i].childNodes[0].innerText;
        count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < length; i++)
    {
        bars[i].style.height = height[i];
        bars[i].childNodes[0].innerText = label[i];
        arr[i] = output[i];
    }
    await new Promise((resolve) =>
    setTimeout(() => {
        resolve();
    }, 1500));
}


//Bucket Sort θ(n + k)
async function bucketsort()
{
    document.getElementById("bucketbtn").style.display = 'none';

    var bucks = document.getElementById("buckets");
    bucks.style.display = 'flex';
    bucks.style.justifyContent = 'space-evenly';
    
    var arr = array;
    var i, temp, index, length = arr.length;

    if(length <= 0)
        return;
    
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);
    var nob = 4;

    var minrange = Math.floor(min/100) * 100;
    var maxrange = Math.ceil(max/100) * 100;

    var diff = parseInt((maxrange - minrange)/4);

    var range = (max - min) / nob;
    var buckets = new Array(length);

    document.getElementById("id1").innerHTML = '[' + minrange + '-' + diff + ']';
    document.getElementById("id2").innerHTML = '[' + (diff + 1) + '-' + diff*2 + ']';
    document.getElementById("id3").innerHTML = '[' + (diff*2 + 1) + '-' + diff*3 + ']';
    document.getElementById("id4").innerHTML = '[' + (diff*3 + 1) + '-' + diff*4 + ']';

    var bars = document.getElementsByClassName("bar");
    
    for(i=0; i<length; i++)
        buckets[i] = [];
    
    var blk1=0,blk2=0,blk3=0,blk4=0;

    for(i=0; i<length;i++)
    {
        bars[i].style.backgroundColor = 'red';

        if(arr[i]>=minrange && arr[i]<=diff)//adding to first bucket
        {
            var container = document.getElementById("first");
            var bar = document.createElement("div");
            bar.classList.add("firstbucket");
            bar.style.height = `${arr[i] * heightfactor}px`;
            bar.style.transform = `translate(${blk1*30}px)`;
            var bar_label = document.createElement("label");
            bar_label.classList.add("bar_id");
            bar_label.innerText = arr[i];
            bar.appendChild(bar_label);
            container.appendChild(bar);
            blk1++;
        }
        if(arr[i]>=diff+1 && arr[i]<=diff*2)//adding to second bucket
        {
            var container = document.getElementById("second");
            var bar = document.createElement("div");
            bar.classList.add("secondbucket");
            bar.style.height = `${arr[i] * heightfactor}px`;
            bar.style.transform = `translate(${blk2*30}px)`;
            var bar_label = document.createElement("label");
            bar_label.classList.add("bar_id");
            bar_label.innerText = arr[i];
            bar.appendChild(bar_label);
            container.appendChild(bar);
            blk2++;
        }
        if(arr[i]>=diff*2+1 && arr[i]<=diff*3)//adding to third bucket
        {
            var container = document.getElementById("third");
            var bar = document.createElement("div");
            bar.classList.add("thirdbucket");
            bar.style.height = `${arr[i] * heightfactor}px`;
            bar.style.transform = `translate(${blk3*30}px)`;
            var bar_label = document.createElement("label");
            bar_label.classList.add("bar_id");
            bar_label.innerText = arr[i];
            bar.appendChild(bar_label);
            container.appendChild(bar);
            blk3++;
        }
        if(arr[i]>=diff*3+1 && arr[i]<=diff*4)//adding to fourth bucket
        {
            var container = document.getElementById("fourth");
            var bar = document.createElement("div");
            bar.classList.add("fourthbucket");
            bar.style.height = `${arr[i] * heightfactor}px`;
            bar.style.transform = `translate(${blk4*30}px)`;
            var bar_label = document.createElement("label");
            bar_label.classList.add("bar_id");
            bar_label.innerText = arr[i];
            bar.appendChild(bar_label);
            container.appendChild(bar);
            blk4++;
        }

        index = (arr[i]-min)/range - parseInt((arr[i]-min)/range);

        if(index==0 && arr[i]!=min)
            buckets[parseInt((arr[i]-min)/range)-1].push(arr[i]);
        else
            buckets[parseInt((arr[i]-min)/range)].push(arr[i]);

        
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 300));
        bars[i].style.backgroundColor = "cyan";
        bars[i].style.height = 0;
        bars[i].childNodes[0].innerText = "";
    }

    await bucketinsertion("firstbucket");
    await bucketinsertion("secondbucket");
    await bucketinsertion("thirdbucket");
    await bucketinsertion("fourthbucket");

    var bucket = document.getElementsByClassName("firstbucket");
    var j=0;
    for(i=0;i<bucket.length;i++)
    {
        bars[j].style.backgroundColor = "#60e368";
        bars[j].style.height = bucket[i].style.height;
        bars[j].childNodes[0].innerText = bucket[i].childNodes[0].innerText;
        bucket[i].childNodes[0].innerText = "";
        bucket[i].style.height = 0;
        
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));

        j++;
    }

    bucket = document.getElementsByClassName("secondbucket");
    for(i=0;i<bucket.length;i++)
    {
        bars[j].style.backgroundColor = "#60e368";
        bars[j].style.height = bucket[i].style.height;
        bars[j].childNodes[0].innerText = bucket[i].childNodes[0].innerText;
        bucket[i].childNodes[0].innerText = "";
        bucket[i].style.height = 0;

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));

        j++;
    }

    bucket = document.getElementsByClassName("thirdbucket");
    for(i=0;i<bucket.length;i++)
    {
        bars[j].style.backgroundColor = "#60e368";
        bars[j].style.height = bucket[i].style.height;
        bars[j].childNodes[0].innerText = bucket[i].childNodes[0].innerText;
        bucket[i].childNodes[0].innerText = "";
        bucket[i].style.height = 0;

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));

        j++;
    }

    bucket = document.getElementsByClassName("fourthbucket");
    for(i=0;i<bucket.length;i++)
    {
        bars[j].style.backgroundColor = "#60e368";
        bars[j].style.height = bucket[i].style.height;
        bars[j].childNodes[0].innerText = bucket[i].childNodes[0].innerText;
        bucket[i].childNodes[0].innerText = "";
        bucket[i].style.height = 0;

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));

        j++;
    }

    document.getElementById("buckets").style.display = 'none';

    for(i=0; i<length; i++)
        buckets[i].sort(function(a,b){return a-b;});
    
    index = 0;
    for (i=0; i<length; i++)
        for (j=0; j<buckets[i].length; j++)
            arr[index++] = buckets[i][j];

    document.getElementById("time").innerText = "Time Complexity θ(n + k): (" + length + "+" + 4 +") = " + (length+4) + " iterations";
    document.getElementById("space").innerText = "Space Complexity θ(n + k): (" + length + "+" + 4 +") = " + (length+4);
}
async function bucketinsertion(cls)
{
    var bars = document.getElementsByClassName(cls);
    bars[0].style.backgroundColor = "#60e368";

    var i,height,temp,j;
    for(i=1;i<bars.length;i++)
    {
        height = bars[i].style.height;
        temp = parseInt(bars[i].childNodes[0].innerHTML);
        bars[i].style.backgroundColor = "yellow";
        j=i-1;

        await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 300)
        );

        while(j>=0 && parseInt(bars[j].childNodes[0].innerHTML)>temp)
        {
            bars[j].style.backgroundColor = "yellow";

            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            j--;

            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, 300)
            );

            for(var k=i;k>=0;k--)
                bars[k].style.backgroundColor = "#60e368";
            
        }
        bars[j + 1].style.height = height;
        bars[j + 1].childNodes[0].innerHTML = temp;

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 300)
        );
        bars[i].style.backgroundColor = "#60e368";
    }
}


//Counting Sort θ(n + k)
async function countingsort()
{
    document.getElementById("countingbtn").style.display = 'none';
    var arr = array;
    var length = arr.length;
    let bars = document.getElementsByClassName("bar");
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);
  
    var range = max - min + 1;

    var count = Array.from({length: range}, (_, i) => 0);
    var output = Array.from({length: arr.length}, (_, i) => 0);
    let height = Array.from({length: arr.length}, (_, i) => 0);
    let label = Array.from({length: arr.length}, (_, i) => 0);

    for (i = 0; i < length; i++)
    {
        bars[i].style.backgroundColor = "red";
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 300));
        count[arr[i] - min]++;
        bars[i].style.backgroundColor = "cyan";
    }
  
    for (i = 1; i < count.length; i++)
    {
        count[i] += count[i - 1];
    }
  
    for (i = length - 1; i >= 0; i--)
    {
        output[count[arr[i] - min] - 1] = arr[i];
        height[count[arr[i] - min] - 1] = bars[i].style.height;
        label[count[arr[i] - min] - 1] = bars[i].childNodes[0].innerText;
        count[arr[i] - min]--;
    }
  
    for (i = 0; i < length; i++)
    {
        bars[i].style.height = height[i];
        bars[i].childNodes[0].innerText = label[i];
        arr[i] = output[i];
        bars[i].style.backgroundColor = "#60e368";
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 700));
    }
    
    document.getElementById("time").innerText = "Time Complexity θ(n + k): (" + length + "+" + (max-min) +") = " + (length+max-min) + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(k): " + (max-min);
}


//7.4.5 Advanced Quick Sort O(nk + n lg(n/k))
async function calladvquick()
{
    document.getElementById("advquickbtn").style.display = 'none';
    var arr = array;
    var k=0, length = arr.length;

    await advquicksort(arr, 0, length-1);
    
    document.getElementById("time").innerText = "Time Complexity θ(nk + n log(n/k)): (" + length + "*" + k + " + " + length + "log(" + length + "/" + k + ")) = " + length*length + " iterations";
    document.getElementById("space").innerText = "Space Complexity O(n): " + length;
}
async function advquicksort(arr,low,high)
{
    while(low<high)
    {
        if(high-low+1 < parseInt(arr.length/2))
        {
            await advquickinsertion(arr,low,high);
            break;
        }
        else
        {
            var pi = await advquickpartition(arr,low,high);
            if(pi-low < high-pi)
            {
                await advquicksort(arr,low,pi-1);
                low = pi+1;
            }
            else
            {
                await advquicksort(arr,pi+1,high);
                high = pi-1;
            }
        }
    }
}
async function advquickinsertion(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, j, height;
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "red";
    bars[low].style.backgroundColor = "#60e368";
    for(var i=low+1;i<=high;i++)
    {
        height = bars[i].style.height;
        bars[i].style.backgroundColor = "yellow";
        val = arr[i];
        j = i-1;

        await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 600)
        );

        while(j>=low && arr[j]>val)
        {
            bars[j].style.backgroundColor = "yellow";
            bars[j+1].style.height = bars[j].style.height;
            bars[j+1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            
            arr[j+1] = arr[j];
            j--;

            await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, 600));

            for(var k=i;k>=low;k--)
                bars[k].style.backgroundColor = "#60e368";
        }
        arr[j+1] = val;
        bars[j+1].style.height = height;
        bars[j+1].childNodes[0].innerHTML =val;
        await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, 600));
        bars[i].style.backgroundColor = "#60e368";
    }
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "#60e368";
}
async function advquickpartition(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, pivot = arr[high];
    bars[high].style.backgroundColor = "red";
    var i=low-1, height, label;

    for(j=low;j<=high-1;j++)
    {
        bars[j].style.backgroundColor = "blueviolet";

        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 400));

        if(arr[j]<pivot)
        {
            i++;

            height = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = height;

            label = bars[i].childNodes[0].innerText;
            bars[i].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            bars[j].childNodes[0].innerText = label;

            val = arr[i];
            arr[i] = arr[j];
            arr[j] = val;

            bars[i].style.backgroundColor = "chartreuse";
            if(i!=j)
                bars[j].style.backgroundColor = "chocolate";

            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 400));
        }
        else
            bars[j].style.backgroundColor = "chocolate";
    }
    i++;

    val = arr[i];
    arr[i] = arr[high];
    arr[high] = val;

    height = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = height;

    label = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = bars[high].childNodes[0].innerText;
    bars[high].childNodes[0].innerText = label;

    bars[i].style.backgroundColor = "red";
    bars[high].style.backgroundColor = "chocolate";

    for(var k=0;k<=high;k++)
        bars[k].style.backgroundColor = "cyan";

    bars[i].style.backgroundColor = "red";
    
    await new Promise((resolve) =>
    setTimeout(() => {
        resolve();
    }, 2000)); //2000

    return i;
}

//8.2.4 Advanced Counting Sort
function advcountingload()
{
    arr = array;
    document.getElementById("textdisplay").innerHTML = arr;
}
async function advcountingsort()
{
    let a = document.getElementById("startrange");
    let b = document.getElementById("endrange");
    var msg = document.getElementById("message");
    msg.style.marginTop = "20px";

    var i, arr = array;
    var length = arr.length;

    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);

    var range = max - min + 1;

    if(a && a.value && b && b.value)
    {
        if((a.value<min && b.value<min) || (a.value>max && b.value>max))
        {
            msg.style.color = "red";
            msg.innerHTML = "Enter correct range";
        }
        else
        {
            msg.innerHTML = "";

            var counter = Array.from({length: max}, (_, i) => 0);

            for(i=0;i<max;i++)
                counter[i] = 0;

            for(i=0;i<length;i++)
                counter[arr[i]]++;

            for(i=1;i<max;i++)
                counter[i] += counter[i-1];

            {
                var count = Array.from({length: range}, (_, i) => 0);
                var output = Array.from({length: arr.length}, (_, i) => 0);

                for (i = 0; i < length; i++)
                    count[arr[i] - min]++;
            
                for (i = 1; i < count.length; i++)
                    count[i] += count[i - 1];
            
                for (i = length - 1; i >= 0; i--)
                {
                    output[count[arr[i] - min] - 1] = arr[i];
                    count[arr[i] - min]--;
                }
            
                for (i = 0; i < length; i++)
                    arr[i] = output[i];
            }
            
            var val;
            if(a.value==0)
                val = counter[b.value];
            else
                val = counter[b.value] - counter[a.value-1];

            document.getElementById("textdisplay").innerHTML = arr;

            msg.style.color = "#60e368";
            msg.innerHTML = "There are " + val + " integers that fall in range from [" + a.value + "..." + b.value + "]";
            
            console.log(val);
            console.log(counter[b.value]);
            console.log(counter[a.value]);
            console.log(counter[a.value]);
            console.log(counter);
            console.log(arr);
        }
    }
    else
    {
        msg.style.color = "red";
        msg.innerHTML = "Enter Range"
    }

    
}