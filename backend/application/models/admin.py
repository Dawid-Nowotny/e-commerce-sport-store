from firebase_admin import db

class Admin:
    def __init__(self, u_id):
        self.u_id = u_id

    def __str__(self):
        return f"Admin(u_id='{self.u_id}')"

    @staticmethod
    def is_admin(u_id):
        ref = db.reference('admins')
        snapshot = ref.child(u_id).get()
        return snapshot is not None

    @staticmethod
    def get_admin(u_id):
        if Admin.is_admin(u_id):
            return Admin(u_id)
        else:
            return None

    @staticmethod
    def get_all_admins():
        ref = db.reference('admins')
        snapshot = ref.get()
        admins = [Admin(u_id) for u_id in snapshot.keys()]
        return admins

    def to_dict(self):
        return {
            'u_id': self.u_id
        }

    def save(self):
        ref = db.reference('admins')
        admin_ref = ref.child(self.u_id)
        admin_ref.set(self.to_dict())