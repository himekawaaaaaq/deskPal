import cv2
from src.vision_engine import VisionEngine

def main():
    # ノートPC内蔵カメラ (0) を指定
    # 将来的にカメラモジュールやストリームURLに変更する場合はここを変更
    CAMERA_SOURCE = 0

    cap = cv2.VideoCapture(CAMERA_SOURCE)
    if not cap.isOpened():
        print(f"[ERROR] カメラ (ID: {CAMERA_SOURCE}) を起動できませんでした。")
        return

    print("=== Desk PAL - YOLO / OpenCV 動作検証 ===")
    print("YOLOv8 エンジンを初期化中...")
    engine = VisionEngine(confidence_threshold=0.5)
    print("検証を開始します。終了するには [q] キーを押してください。\n")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("[WARN] フレームを取得できませんでした。")
            break

        # AI解析の実行
        result = engine.process_frame(frame)

        # ターミナルへ動作検証ログを出力
        print(f"[Vision] ステータス: {result['status']} | 検出物体: {result['detected_summary']}")

        # ノートPC画面に検出バウンディングボックス付きの映像を表示
        cv2.imshow("Workspace Vision Validation (Laptop Cam)", result["annotated_frame"])

        # 'q' キー押下で安全に終了
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("\n動作検証を終了します。")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()