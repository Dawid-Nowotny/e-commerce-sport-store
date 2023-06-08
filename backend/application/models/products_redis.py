class ProductRedis:
    def __init__(self, product, size):
        self.product = product
        self.size = size

    def to_json(self):
        return {'product': self.product, 'size': self.size}

    @classmethod
    def from_json(cls, json_data):
        return cls(json_data['product'], json_data['size'])