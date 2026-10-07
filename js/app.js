function getOracleLevel() {
    var stored = localStorage.getItem('oracle2_level');
    if (!stored) {
        return 1;
    }
    var num = parseInt(stored, 10);
    return isNaN(num) ? 1 : num;
}

function setOracleLevel(level) {
    var current = getOracleLevel();
    if (level > current) {
        localStorage.setItem('oracle2_level', level.toString());
    }
}

function isWarriorNamed() {
    return localStorage.getItem('oracle2_warrior_named') === 'true';
}

function setWarriorNamed() {
    localStorage.setItem('oracle2_warrior_named', 'true');
    setOracleLevel(6);
}

function renderHeaderAndNav(activeLevel, pageTitle) {
    document.title = pageTitle;
    var current = getOracleLevel();
    var levelNodes = [
        { num: 1, label: 'I \u2014 Confirm Channel' },
        { num: 2, label: 'II \u2014 Name Length' },
        { num: 3, label: 'III \u2014 Letter by Letter' },
        { num: 4, label: 'IV \u2014 The Vow' },
        { num: 5, label: 'V \u2014 Name the Warrior' }
    ];

    var headerEl = document.getElementById('oracle-header-slot');
    if (headerEl) {
        var headerHtml = '<header class="oracle-header">' +
            '<div class="oracle-title">Sanjaya\'s Oracle</div>' +
            '<div class="oracle-subtitle">Kurukshetra War Registry &nbsp;\u00b7&nbsp; The Second Trial</div>' +
            '</header>' +
            '<nav class="level-bar" aria-label="Challenge progress">';

        for (var i = 0; i < levelNodes.length; i++) {
            var node = levelNodes[i];
            var state = '';
            if (current > node.num) {
                state = 'done';
            } else if (activeLevel === node.num) {
                state = 'active';
            }
            var ariaCurrent = (state === 'active') ? 'step' : 'false';
            headerHtml += '<div class="level-node ' + state + '" aria-current="' + ariaCurrent + '">' +
                '<span class="level-dot"></span>' +
                node.label +
                '</div>';
            if (node.num < 5) {
                headerHtml += '<span class="level-sep" aria-hidden="true">\u203a</span>';
            }
        }
        headerHtml += '</nav>';
        headerEl.innerHTML = headerHtml;
    }

    var footerEl = document.getElementById('oracle-footer-slot');
    if (footerEl) {
        footerEl.innerHTML = '<footer class="oracle-footer">' +
            '<p>\u2694 &nbsp; Kurukshetra War Registry \u2014 Sanjaya\'s Oracle &nbsp; \u2694</p>' +
            '<p style="margin-top:0.4rem; font-size:0.75rem; opacity:0.6;">' +
            '\u092f\u0924\u094d\u0930 \u092f\u094b\u0917\u0947\u0936\u094d\u0935\u0930\u0903 \u0915\u0943\u0937\u094d\u0923\u0903 \u2014 Where Krishna is master of Yoga' +
            '</p>' +
            '</footer>';
    }
}

function oracleApi(type, value) {
    return fetch('/api/check.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: type, value: value })
    }).then(function(r) { return r.json(); });
}

function oracleQuery(q) {
    return fetch('/api/query.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: q })
    }).then(function(r) { return r.json(); });
}

function verifyGateAccess(requiredLevel) {
    var cur = getOracleLevel();
    if (cur < requiredLevel) {
        var back = (requiredLevel <= 2) ? 'index.html' : 'level' + (requiredLevel - 1) + '.html';
        window.location.replace(back + '?err=locked');
        return false;
    }
    return true;
}
