from playwright.sync_api import Page, expect

# Modals

def test_modal_cta(page: Page):
    page.goto('http://localhost:5173')
    page.click('.cta-button')
    expect(page.locator('.modalcta-back')).to_be_visible()

def test_modal_cards(page: Page):
    page.goto('http://localhost:5173')
    page.click('.card-button')
    expect(page.locator('.modal-section'))

# Catalog

CATEGORIES = ["Все", "Грузовые", "Пассажирские", "Грузо-пассажирские"]

def test_categories_rendered(page: Page):
    page.goto('http://localhost:5173')
    for cat in CATEGORIES:
        expect(page.locator(f"button[data-category='{cat}']")).to_be_visible()

def test_paginator_show_pages(page: Page):
    page.goto('http://localhost:5173')
    page.wait_for_selector('.paginator')
    number_buttons = page.locator('.paginator span button')
    expect(number_buttons).to_have_count(1)
    expect(number_buttons).to_contain_text('1')
