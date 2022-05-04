import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  addIncompleteList(inputText);
};

const addIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // p生成
  const p = document.createElement("p");
  p.innerText = text;

  // 完了button生成
  const finishButton = document.createElement("button");
  finishButton.innerText = "完了";
  finishButton.addEventListener("click", () => {
    // 未完了リストから削除
    removeFromIncompleteList(finishButton.parentNode.parentNode);

    // 完了リストに追加する要素
    const addTarget = finishButton.parentNode;
    const text = addTarget.firstElementChild.innerText;

    // div以下を初期化
    addTarget.textContent = null;

    // 完了リストに追加する要素を作成
    const p = document.createElement("p");
    p.innerText = text;
    addTarget.appendChild(p);

    // 戻すボタンを追加
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    returnButton.addEventListener("click", () => {
      // 戻すボタンの親タグから削除
      const deleteTarget = returnButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // 未完了リストに追加
      const returnText = returnButton.parentNode.firstElementChild.innerText;
      addIncompleteList(returnText);
    });

    addTarget.appendChild(returnButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // 削除button生成
  const removeButton = document.createElement("button");
  removeButton.innerText = "削除";
  removeButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)の親タグ(li)を未完了リストから削除
    removeFromIncompleteList(removeButton.parentNode.parentNode);
  });

  const removeFromIncompleteList = (target) => {
    document.getElementById("incomplete-list").removeChild(target);
  };

  const removeFromCompleteList = (target) => {
    document.getElementById("complete-list").removeChild(target);
  };

  // divの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(finishButton);
  div.appendChild(removeButton);

  // liの子要素にdivを設定
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
