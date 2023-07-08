class ProductRedis:
    def __init__(self, product, size, amount=1):
        self.product = product
        self.size = size
        self.amount = amount

    def to_json(self):
        return {'product': self.product, 'size': self.size, 'amount': self.amount}