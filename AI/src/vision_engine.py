import cv2
from ultralytics import YOLO

class VisionEngine:
    """
    Workspace Vision 解析エンジン (AI単体検証用)
    """
    def __init__(self, model_path="yolov8n.pt", confidence_threshold=0.5):
        # 軽量モデル YOLOv8n のロード（初回実行時に自動ダウンロード）
        self.model = YOLO(model_path)
        self.conf_threshold = confidence_threshold

        # MVP検出対象オブジェクト (COCOデータセットID)
        # 0: person (在席判定用), 63: laptop, 67: cell phone, 73: book
        self.target_classes = {
            0: "person",
            63: "laptop",
            67: "cell phone",
            73: "book"
        }

    def process_frame(self, frame):
        """
        1フレームを解析し、MVP対象の検出結果と在席ステータスを返します。
        """
        results = self.model(frame, verbose=False)[0]
        
        detected_objects = []
        is_person_present = False

        for box in results.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])
            
            # 信頼度閾値およびMVP対象クラスのみをフィルタリング
            if class_id in self.target_classes and confidence >= self.conf_threshold:
                label_name = self.target_classes[class_id]
                detected_objects.append(label_name)
                
                if label_name == "person":
                    is_person_present = True

        status = "PRESENT (在席)" if is_person_present else "ABSENT (離席)"
        
        # 個数カウントの作成
        unique_objects = set(detected_objects)
        counts = {item: detected_objects.count(item) for item in unique_objects}

        return {
            "status": status,
            "is_person_present": is_person_present,
            "detected_summary": counts,
            "annotated_frame": results.plot()  # 描画済みフレーム
        }