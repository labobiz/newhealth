// 健康データを保存するオブジェクト
let progressData = {
    weight: [],
    exercise: []
};

// グラフの初期化
let ctx = document.getElementById('progressChart').getContext('2d');
let progressChart = new Chart(ctx, {
    type: 'line', // 折れ線グラフ
    data: {
        labels: [], // 日付やデータポイントのラベル
        datasets: [{
            label: '体重 (kg)',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
        }, {
            label: '運動時間 (分)',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: '日付'
                }
            },
            y: {
                title: {
                    display: true,
                    text: '値'
                },
                min: 0
            }
        }
    }
});

// 進捗記録の関数
function trackProgress() {
    let weight = document.getElementById("weight").value;
    let exercise = document.getElementById("exercise").value;
    
    if (weight && exercise) {
        // 現在の日付を取得
        let today = new Date().toLocaleDateString();
        
        // データを保存
        progressData.weight.push(weight);
        progressData.exercise.push(exercise);
        
        // ラベル（日付）を追加
        progressChart.data.labels.push(today);

        // グラフのデータを更新
        progressChart.data.datasets[0].data = progressData.weight;
        progressChart.data.datasets[1].data = progressData.exercise;

        // グラフを更新
        progressChart.update();

        // 進捗表示
        document.getElementById("progressText").innerText = `現在の体重: ${weight}kg, 運動時間: ${exercise}分`;
    } else {
        document.getElementById("progressText").innerText = "体重または運動時間が未入力です。";
    }
}
