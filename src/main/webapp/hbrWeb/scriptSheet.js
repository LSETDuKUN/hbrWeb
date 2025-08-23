//加载菜单及绑定事件
function loadMenu() {
    // 获取menu元素
    const menuDiv = document.getElementById('menu');

    // 创建菜单内容的HTML

    menuDiv.innerHTML = `
        <div class="menu-container">
            <div id="team">部队</div>
            <div id="character">角色</div>
            <div id="style">风格</div>
            <div id="skill">技能</div>
        </div>
        <div id="blank"></div>
    `;
    let resetBlank = document.getElementById("blank");
    resetBlank.style.height = "70%";


    // 在DOM元素创建后绑定事件
    const team = document.getElementById("team");

    team.onclick = function (e) {
        e.preventDefault();
        loadTeam();
        // console.log("加载队伍信息");
    };

    // 绑定其他按钮事件
    const character = document.getElementById("character");
    character.onclick = function (e) {
        e.preventDefault();
        loadCharacter();
    };


    const style = document.getElementById("style");
    style.onclick = function () {
        loadStyle();
    };

    const skill = document.getElementById("skill");
    skill.onclick = function () {
        loadExSkill();
    };
}

/**
 * loadTeam 加载队伍功能
 * loadCharacterQuery 加载角色功能
 * loadStyle 加载风格
 * loadExSkill 加载技能
 */
function loadTeam() {
    const teamFunDiv = document.getElementById("SymFun");
    teamFunDiv.innerHTML = `
        <form class="query" name="queryForm" method="post">
            <input type="text" id="id" name="id" placeholder="请输入id">
            <input type="button" value="查询" onclick="debouncedQuery()">
        </form>
    `;
    console.log("加载队伍信息");
}

// 创建防抖版本的查询函数
const debouncedQuery = debounce(queryTNaById, 500);
/**
 * 防抖函数 - 适合查询场景
 */
// function debounce(fn, delay) {
//     let timer = null;
//     return function(...args) {
//         // 清除之前的定时器
//         if (timer) {
//             window.alert("error");
//             clearTimeout(timer);
//         }
//         // 设置新的定时器
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//             timer = null;
//         }, delay);
//     };
// }

function loadCharacter() {
    const characterFunDiv = document.getElementById("SymFun");
    characterFunDiv.innerHTML = `
        <form class="query" name="queryForm" id="queryCharForm" method="post">
            <input type="text" id="queryChar" name="queryChar" placeholder="你好">
            <select name="queryBy" class="querySelect">
                <option value="id">按编号</option>
                <option value="name">按姓名</option>
            </select>
            <input type="button" id="queryCharButton" value="查询">
        </form>
        `;
    setTimeout(() => {
        judgeQueryBy();
        const selectElement = document.querySelector('select[name="queryBy"]');
        if (selectElement) {
            selectElement.addEventListener('change', judgeQueryBy);
        }
    }, 0);
    /**下面的方法也可行，但不推荐，所以其实只需添加一个事件监听器
     * judgeQueryBy();
     *         const selectElement = document.querySelector('select[name="queryBy"]');
     *         if (selectElement) {
     *             selectElement.addEventListener('change', judgeQueryBy);
     *         }
     */
    judgeQueryBy();
    const selectElement = document.querySelector('select[name="queryBy"]');
    if (selectElement) {
        selectElement.addEventListener('change', judgeQueryBy);
    }
}

function loadStyle() {
    console.log("加载风格信息");
    // 这里添加加载风格信息的逻辑
}

function loadExSkill() {
    console.log("加载必杀技信息");
    // 这里添加加载必杀技信息的逻辑
}

/**
 * 判断query方式
 */
function judgeQueryBy() {
    const queryForm = document.forms.queryForm;
    if (!queryForm || !queryForm.queryBy) return;

    const judge = queryForm.queryBy.value;
    const queryText = document.getElementById("queryChar");
    const queryFun = document.getElementById("queryCharButton");

    if (!queryText || !queryFun) return;

    if (judge === "id") {
        queryText.placeholder = "请输入id";
        queryFun.onclick = queryChById;
    } else {
        queryText.placeholder = "请输入姓名";
        queryFun.onclick = queryChByName;
    }
}

function queryTNaById() {
    let id = parseInt(document.getElementById("id").value);

    if (isNaN(id) || id <= 0) {
        alert("请输入有效的ID");
        return;
    }

    // 使用web.xml中配置的路径
    const baseUrl = 'http://localhost:8089/hbrWeb_war_exploded';
    const url = baseUrl + '/api/team?id=' + id;

    console.log('请求URL:', url);

    fetch(url, {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            console.log('响应状态:', response.status);
            if (!response.ok) {
                return response.text().then(text => {
                    console.log('响应内容:', text);
                    throw new Error('HTTP ' + response.status);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('解析后的数据:', data);
            displayResult(data);
        })
        .catch(error => {
            console.error('完整错误:', error);
            alert('查询失败: ' + error.message);
        });
}

function queryChById() {
    window.alert("暂未开放");
}

function queryChByName() {
    window.alert("未开放");
}

function displayResult(data) {
    const resultDiv = document.getElementById("SymFun");

    // 移除之前的结果
    const oldResult = resultDiv.querySelector('.result-container');
    if (oldResult) {
        oldResult.remove();
    }

    // 创建结果显示区域
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.innerHTML = `
        <h3>查询结果：</h3>
        <div class="result-content">
            <p><strong>队伍ID:</strong> ${data.id}</p>
            <p><strong>队伍名称:</strong> ${data.name}</p>
        </div>
    `;

    // 将结果添加到页面
    resultDiv.appendChild(resultContainer);
}

/**
 * 防抖
 */
function debounce(fn, delay) {
    let timer=null;
    return function(){
        if(timer){
            clearTimeout(timer);
            console.log(timer);
        }
        timer=setTimeout(()=>{
            fn();
            timer=null;
        },delay);
    }
}

